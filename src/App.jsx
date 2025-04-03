import { Routes, Route } from 'react-router-dom';
import ChatRoomList from './pages/ChatRoomList';
import ChatRoom from './pages/ChatRoom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatRoomList userId="67ecc50e8b0e24af0abb58b7" />} />
      <Route path="/chat/:roomId" element={<ChatRoom />} />
    </Routes>
  );
}

export default App;