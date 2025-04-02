const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    roomName: String,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isAnonymous: { type: Boolean, default: false },
    isTimed: { type: Boolean, default: false },
    expiresAt: Date,
    isGroup: { type: Boolean, default: false },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('ChatRoom', chatRoomSchema);