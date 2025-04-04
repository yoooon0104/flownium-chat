import { useEffect, useState } from 'react';
import { fetchChatRooms } from '../api/chatrooms';

const ChatRoomList = ({ userId }) => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const loadRooms = async () => {
            try {
                const data = await fetchChatRooms(userId);
                console.log('✅ 서버 응답:', data); // 이거 추가
                setRooms(data);

            } catch (err) {
                console.error('채팅방 목록 불러오기 실패', err);
            }
        };

    if(userId) loadRooms();
    }, [userId]);
    
    return (
        <div clasName="p-4 space-y-3">
            {rooms.map((room) => (
                <div key={room._id} className="border rounded-xl p-4 shadow bg-white">
                    <h2 className="font-bold text-lg">{room.roomName}</h2>
                    <p className="text-sm text-gray-500">
                        {room.lastMessage ? room.lastMessage.text : '메세지가 없습니다.'}
                    </p>
                    {room.isTimed && (
                        <p className="text-xs text-red-500">
                            ⏳ 만료: {new Date(room.expiresAt).toLocaleString()}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChatRoomList;