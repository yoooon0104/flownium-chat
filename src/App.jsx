import { useEffect, useRef, useState } from 'react';
import ChatBubble from './components/ChatBubble';
import { io } from 'socket.io-client';

// const socket = io('http://localhost:3001'); // 서버 주소 연결

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const [socket, setSocket] = useState(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({behavior: 'smooth'});
  }

  useEffect(() => {
    const newSocket = io('http://localhost:3001', {
      transports: ['websocket'],
    });
    setSocket(newSocket);
  
    return () => {
      newSocket.disconnect(); // 컴포넌트 언마운트 시 정리!
    };
  }, []);


  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', (data) => {
      console.log('💬 수신한 메시지:', data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  const handleSend = () => {
    if(!input.trim() || !socket) return;

    const newMsg = {text: input, isMine: true};
    console.log('📤 내가 보낸 메시지:', newMsg);
    
    setMessages((prev) => [...prev, newMsg]); // t상태 업데이트 한 번만
    socket.emit('send_message', {text: input, isMine:false}); // 서버로는 "상대방 메시지"처럼 보냄
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 p-4">
      {/* 채팅리스트 */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <ChatBubble key={idx} message={msg.text} isMine={msg.isMine} />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 입력창 + 버튼*/}
      <div className="flex gap-2">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="메세지를 입력하세요"
        className="flex-1 p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" 
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600" 
      >
        전송
      </button>
      </div>
    </div>
  );
}

export default App;