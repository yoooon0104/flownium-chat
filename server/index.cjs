const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {
    console.log('🔥 사용자 접속:', socket.id);
    
    socket.on('send_message', (data) => {
        console.log('📨 메시지 수신:', data);
        socket.broadcast.emit('receive_message', data);
    });

    socket.on('disconnect', () =>{
        console.log('❌ 사용자 퇴장:', socket.id);
    });
});

server.listen(3001, () => {
    console.log('✅ Socket.IO 서버 실행 중 (http://localhost:3001)');
});