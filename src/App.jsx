// import { useEffect, useRef, useState } from 'react';
// import ChatBubble from './components/ChatBubble';
// import { io } from 'socket.io-client';

// pages
import ChatRoomList from './pages/ChatRoomList';

// const socket = io('http://localhost:3001'); // 서버 주소 연결

function App() {
  // const [messages, setMessages] = useState([]);
  // const [input, setInput] = useState('');
  // const [socket, setSocket] = useState(null);
  // const chatEndRef = useRef(null);

  const userId = '67ecc50e8b0e24af0abb58b7';

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold p-4">💬 채팅방 목록</h1>
      <ChatRoomList userId={userId} />
    </div>
  );

  // // 닉네임 관련 모달
  // const [username, setUserName] = useState('');
  // const [showModal, setShowModal] = useState(true);



  // const scrollToBottom = () => {
  //   chatEndRef.current?.scrollIntoView({behavior : 'smooth'});
  // }

  // useEffect(() => {
  //   const newSocket = io('http://localhost:3001', {
  //     transports : ['websocket'],
  //   });
  //   setSocket(newSocket);
  
  //   return () => {
  //     newSocket.disconnect(); // 컴포넌트 언마운트 시 정리!
  //   };
  // }, []);

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on('receive_message', (data) => {
  //     console.log('💬 수신한 메시지:', data);
  //     setMessages((prev) => [...prev, data]);
  //   });

  //   return () => {
  //     socket.off('receive_message');
  //   };
  // }, [socket]);

  // const handleSend = () => {
  //   if(!input.trim() || !socket) return;

  //   const time = new Date().toLocaleTimeString('ko-KR', {
  //     hour : '2-digit',
  //     minute : '2-digit',
  //   });

  //   const newMsg = {
  //     text : input, 
  //     isMine : true,
  //     user : username,
  //     time : time,
  //   };
  //   console.log('📤 내가 보낸 메시지:', newMsg);

  //   setMessages((prev) => [...prev, newMsg]); // 상태 업데이트 한 번만
  //   socket.emit('send_message', {...newMsg, isMine:false}); // 서버로는 "상대방 메시지"처럼 보냄
  //   setInput('');
  // };

  // const handleNicknameSubmit = () => {
  //   if(username.trim()) {
  //     setShowModal(false);
  //   }
  // }

  // return (
  //   <div className="flex flex-col h-screen bg-gray-100 p-4 relative">
  //     {/* 닉네임 모달 */}
  //     {showModal && (
  //       <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  //         <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center gap-4">
  //           <h2 className="text-xl font-bold"> 닉네임을 입력하세요</h2>
  //           <input type="text" className="p-2 border rounded-xl w-64 text-center" value={username} onChange={(e) => setUserName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleNicknameSubmit()}
  //             placeholder='닉네임을 입력하세요'/>
  //             <button className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600" onClick={handleNicknameSubmit}>
  //               입장하기
  //             </button>
  //         </div>
  //       </div>
  //     )}

  //     {/* 채팅창 */}  
  //     <div className="flex-1 overflow-y-auto mb-4">
  //       {messages.map((msg, idx) => (
  //         <ChatBubble 
  //           key={idx} 
  //           message={msg.text} 
  //           isMine={msg.isMine}
  //           user={msg.user}
  //           time={msg.time}/>
  //       ))}
  //       <div ref={chatEndRef} />
  //     </div>

  //     {/* 입력창 */}
  //     <div className="flex gap-2">
  //       <input type="text" className="flex-1 p-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" 
  //         placeholder="메세지를 입력하세요" value={input} 
  //         onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}/>
  //     <button className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600" onClick={handleSend}>
  //       전송
  //     </button>
  //     </div>
  //   </div>
  // );
}

export default App;