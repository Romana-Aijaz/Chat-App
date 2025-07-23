'use client';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWindow from '../components/ChatWindow';

const loggedInUser = {
  id: 0,
  name: 'Romana',
  avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
};

const users = [
  {
    id: 1,
    name: 'Alice',
    status: 'online',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: 2,
    name: 'Bob',
    status: 'offline',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: 3,
    name: 'Charlie',
    status: 'online',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 4,
    name: 'Diana',
    status: 'offline',
    avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
  },
];

export default function Home() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSignOut = () => {
    alert('Signing out...');
     window.location.href = '/login'; 
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Header user={loggedInUser} onSignOut={handleSignOut} />
      <div className="flex flex-1">
        <Sidebar users={users} onSelectUser={setSelectedUser} />
         <ChatWindow selectedUser={selectedUser} />
      </div>
    </div>
  );
}

