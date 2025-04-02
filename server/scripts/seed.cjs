// scripts/seed.js

require('dotenv').config();
console.log('🧪 MONGO_URI 값 확인:', process.env.MONGO_URI);
const mongoose = require('mongoose');
const User = require('../models/User.cjs');
const ChatRoom = require('../models/ChatRoom.cjs');
const Message = require('../models/Message.cjs');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ DB 연결 완료');

  // 유저 2명 생성
  const user1 = await User.create({
    kakaoId: 'test_kakao_001',
    nickname: '길동',
    profileImage: 'https://dummyimage.com/100x100/000/fff',
  });

  const user2 = await User.create({
    kakaoId: 'test_kakao_002',
    nickname: '철수',
    profileImage: 'https://dummyimage.com/100x100/000/fff',
  });

  // 일반 채팅방 생성
  const normalRoom = await ChatRoom.create({
    roomName: '길동과 철수의 방',
    participants: [user1._id, user2._id],
    isGroup: false,
    ownerId: user1._id,
  });

  // 메시지 삽입
  await Message.create([
    {
      chatRoomId: normalRoom._id,
      senderId: user1._id,
      text: '안녕 철수야!',
    },
    {
      chatRoomId: normalRoom._id,
      senderId: user2._id,
      text: '어이 길동이 오랜만이네 ㅋㅋ',
    },
  ]);

  // 익명 1회용 방도 하나 추가
  await ChatRoom.create({
    roomName: '익명 대화방',
    participants: [],
    isAnonymous: true,
    isGroup: false,
    ownerId: null,
  });

  // 24시간 제한 방
  const now = new Date();
  await ChatRoom.create({
    roomName: '하루짜리 방',
    participants: [user1._id],
    isTimed: true,
    expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000), // 24시간 후
    isGroup: false,
    ownerId: user1._id,
  });

  console.log('🎉 샘플 데이터 삽입 완료');
  process.exit();
}

seed().catch((err) => {
  console.error('❌ 에러 발생:', err);
  process.exit(1);
});
