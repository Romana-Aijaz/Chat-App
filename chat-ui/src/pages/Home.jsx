import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWindow from '../components/ChatWindow';
import axios from 'axios';
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000'); 


export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
console.log("token here:")
console.log(token)
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
      socket.emit('join', { userId: JSON.parse(storedUser)._id });

      // Fetch users from backend
      axios
        .get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // Exclude the currently logged-in user
          const filtered = res.data.filter(
            (u) => u._id !== JSON.parse(storedUser)._id
          );
          setUsers(filtered);
        })
        .catch((err) => {
          console.error('Failed to fetch users:', err);
        });
    } else {
      // redirect if not logged in
      window.location.href = '/login';
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (!loggedInUser) return null; // or a loader
  console.log(loggedInUser)
  console.log(selectedUser)
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header user={loggedInUser} onSignOut={handleSignOut} />
      <div className="flex flex-1">
        <Sidebar users={users} onSelectUser={setSelectedUser} />
        <ChatWindow
          selectedUser={selectedUser}
          loggedInUser={loggedInUser}
          socket={socket}
        />
      </div>
    </div>
  );
}



