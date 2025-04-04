import { Routes, Route } from 'react-router-dom';
import ChatListPage from './pages/ChatListPage';
import ChatRoomPage from './pages/ChatRoomPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChatListPage userId="67ecc50e8b0e24af0abb58b7" />} />
      <Route path="/chat/:roomId" element={<ChatRoomPage />} />
    </Routes>
  );
}

export default App;