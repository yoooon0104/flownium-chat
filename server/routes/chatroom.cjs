const express = require('express');
const ChatRoom = require('../models/ChatRoom.cjs');
const Message = require('../models/Message.cjs');

const router = express.Router();

//GET /chatrooms?userId=xxx
router.get('/', async(req, res) =>{
    const { userId } = req.query;

    if(!userId) {
        return res.status(400).json({error: 'userId is required'});
    }

    try {
        const chatrooms = await ChatRoom.find({participants : userId})
        .populate('participants', 'nickname profileImage')
        .sort({updatedAt : -1});

        const results = await Promise.all(
            chatrooms.map(async (room) => {
                const lastMessage = await Message.findOne({ chatRoomId : room._id})
                .sort({ createdAt : -1 })
                .lean();
                return {
                    _id: room._id,
                    roomName: room.roomName,
                    participantsCount: room.participants.length,
                    isGroup: room.isGroup,
                    isAnonymous: room.isAnonymous,
                    isTimed: room.isTimed,
                    expiresAt: room.expiresAt,
                    lastMessage: lastMessage
                        ? {
                            text: lastMessage.text,
                            timestamp: lastMessage.createdAt,
                        }
                    : null,
                };
            })
        );
        
        res.json(results);
    } catch (err) {
        console.error('❌ 채팅방 목록 조회 실패:', err);
        res.status(500).json({ error: '서버 에러' });
    }
});
module.exports = router;