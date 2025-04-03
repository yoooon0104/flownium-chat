import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import ChatBubble from '../components/ChatBubble';

const socket = io('http://localhost:3010');

function ChatRoom() {
    const { roomId } = useParams();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatEndRef = useRef(null);

    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(true);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log('💬 수신한 메시지:', data);
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;

        const time = new Date().toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
        });

        const newMsg = {
            text: input,
            isMine: true,
            user: username,
            time: time,
        };

        setMessages((prev) => [...prev, newMsg]);
        socket.emit('send_message', {
            ...newMsg,
            chatRoomId: roomId,
            isMine: false,
        });

        setInput('');
    };

    const handleNicknameSubmit = () => {
        if (username.trim()) {
            setShowModal(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 p-4 relative">
            {showModal && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-4">
                        <h2 className="text-xl font-bold">닉네임을 입력하세요</h2>
                        <input
                            type="text"
                            className="p-2 border rounded-xl w-64 text-center"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleNicknameSubmit()}
                            placeholder="닉네임을 입력하세요"
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
                            onClick={handleNicknameSubmit}
                        >
                            입장하기
                        </button>
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((msg, idx) => (
                    <ChatBubble
                        key={idx}
                        message={msg.text}
                        isMine={msg.isMine}
                        user={msg.user}
                        time={msg.time}
                    />
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="flex gap-2">
                <input
                    type="text"
                    className="flex-1 p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="메세지를 입력하세요"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                    onClick={handleSend}
                >
                    전송
                </button>
            </div>
        </div>
    );
}

export default ChatRoom;
