const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    chatRoomId: { type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    timestamp: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);