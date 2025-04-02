const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  kakaoId: String,
  nickname: String,
  profileImage: String,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);