const express = require('express');
const http = require('http'); // ✅ add this
const { Server } = require('socket.io'); // ✅ add this
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const authRoutes = require('./routes/auth');
const Message = require('./models/Message');

const app = express();
const server = http.createServer(app); // ✅ wrap app with http
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/messages', messageRoutes);

// ✅ Socket.io setup
io.on('connection', (socket) => {
  console.log('🟢 User connected:', socket.id);

  // Join a specific room for a conversation or user
  socket.on('join', ({ userId }) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  // Receive message and broadcast
  socket.on('sendMessage', async ({ sender, receiver, text }) => {
    console.log(sender)
    const newMessage = await Message.create({ sender, receiver, text });

    // Emit message to receiver
    io.to(receiver).emit('receiveMessage', newMessage);
    io.to(sender).emit('messageSent', newMessage);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });
});

// ✅ Start DB and server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    server.listen(5000, () => console.log('🚀 Server listening on port 5000'));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

