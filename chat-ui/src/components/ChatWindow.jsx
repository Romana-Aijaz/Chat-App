import { useEffect, useState } from 'react';
import axios from 'axios';

const ChatWindow = ({ selectedUser, loggedInUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // ✅ Fetch chat history
  useEffect(() => {
    if (selectedUser) {
      axios
        .get(`http://localhost:5000/api/messages/${loggedInUser.id}/${selectedUser._id}`)
        .then((res) => setMessages(res.data))
        .catch((err) => console.error('Failed to fetch messages:', err));
    }
  }, [selectedUser, messages]);

  // ✅ Real-time receive message
  useEffect(() => {
    const handleReceiveMessage = (message) => {
      if (
        (message.sender === selectedUser._id && message.receiver === loggedInUser.id) ||
        (message.sender === loggedInUser.id && message.receiver === selectedUser._id)
      ) {
        setMessages((prev) => [...prev, message]);
      }
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [selectedUser, loggedInUser.id, socket]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      sender: loggedInUser.id,
      receiver: selectedUser._id,
      text: newMessage,
    };

    // ✅ Emit message to backend
    socket.emit('sendMessage', messageData);

    // ✅ Optimistically show message
    setMessages((prev) => [
      ...prev,
      { ...messageData, _id: Date.now().toString() },
    ]);

    setNewMessage('');
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full">
      <div className="p-4 border-b bg-white font-semibold">
        Chatting with {selectedUser.name}
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.sender === loggedInUser.id
                ? 'bg-blue-500 text-white self-end ml-auto'
                : 'bg-gray-200 text-gray-800 self-start'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-white flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

