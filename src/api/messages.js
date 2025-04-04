import axios from 'axios';
const BASE_URL = 'http://localhost:3010';

export const fetchMessages = async (chatRoomId) => {
    const res = await axios.get(`${BASE_URL}/api/chatrooms/${chatRoomId}/messages`);
    return res.data;
};