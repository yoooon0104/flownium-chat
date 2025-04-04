const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// 📦 모델 불러오기
const Message = require('./models/message.model.cjs');
const User = require('./models/user.model.cjs');
const ChatRoom = require('./models/chatroom.model.cjs');

// 🌐 라우터 불러오기
const chatroomRouter = require('./routes/chatroom-routes.cjs'); // ✅ message 라우터 제거

// 📡 DB 연결
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB 연결 성공!'))
    .catch((err) => console.error('❌ MongoDB 연결 실패:', err));

// ⚙️ Express 앱 설정
const app = express();
app.use(cors());
app.use(express.json());

// 📌 REST API 라우터 등록
app.use('/api/chatrooms', chatroomRouter); // ✅ 여기에 message까지 포함됨

app.get('/', (req, res) => {
    res.send('🔥 Flownium Chat Server is running!');
});

// 🧩 HTTP 서버 및 Socket.IO 서버 생성
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// ⚡ Socket.IO 이벤트 처리
io.on('connection', (socket) => {
    console.log('🔥 사용자 접속:', socket.id);

    socket.on('send_message', async (data) => {
        console.log('📨 메시지 수신:', data);

        const newMsg = new Message({
            chatRoomId: data.chatRoomId || null,
            senderId: data.senderId || null,
            text: data.text,
        });
        await newMsg.save();

        socket.broadcast.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('❌ 사용자 퇴장:', socket.id);
    });
});

// 🚀 서버 실행
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`✅ Socket.IO 서버 실행 중 (http://localhost:${PORT})`);
});