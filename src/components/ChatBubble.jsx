import React from 'react';

const ChatBubble = ({ message, isMine }) => {
    return (
        <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-2`}>
        <div
            className={`max-w-[70%] px-4 py-2 rounded-2xl text-white ${
            isMine ? 'bg-blue-500 rounded-br-none' : 'bg-gray-700 rounded-bl-none'
            }`}
        >
            {message}
        </div>
        </div>
    );
};

export default ChatBubble;
