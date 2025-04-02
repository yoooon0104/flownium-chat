import axios from 'axios';

const BASE_URL = 'http://localhost:3010'; // 백엔드 주소 (Render 배포 시 바뀜)

export const fetchChatRooms = async (userId) => {
    const res = await axios.get(`${BASE_URL}/api/chatrooms`, {
        params: { userId },
    });
    return res.data;
}