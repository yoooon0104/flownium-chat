const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// 모델 불러오기
const Message = require('./models/Message.cjs');
const User = require('./models/User.cjs');
const ChatRoom = require('./models/ChatRoom.cjs');

const chatroomRouter = require('./routes/chatroom.cjs');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB 연결 성공!'))
    .catch((err) => console.error('❌ MongoDB 연결 실패:', err));

// 서버 설정
const app = express();

app.use('/api/chatrooms', chatroomRouter);

app.get('/', (req, res) => {
    res.send('🔥 Flownium Chat Server is running!');
});
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('🔥 사용자 접속:', socket.id);
    
    socket.on('send_message', async (data) => {
        console.log('📨 메시지 수신:', data);

        const newMsg = new Message({
            chatRoomId : data.chatRoomId || null,
            senderId : data.senderId || '익명',
            text : data.text,
        });
        await newMsg.save();

        socket.broadcast.emit('receive_message', data);
    });

    socket.on('disconnect', () =>{
        console.log('❌ 사용자 퇴장:', socket.id);
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`✅ Socket.IO 서버 실행 중 (http://localhost:${PORT})`);
});