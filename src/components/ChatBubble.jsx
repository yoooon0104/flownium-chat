import React from 'react';

function ChatBubble ({ message, isMine, user, time }) {
    return (
        <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} mb-2`}>
            <div className={`p-3 rounded-2xl max-w-xs ${
                isMine
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-black rounded-bl-none'
            }`}>
            
            <div className="text-sm font-bold mb-1">
                {user} <span className="text-xs text-gray-300">{time}</span>
            </div>
            <div>{message}</div>
        </div>
        </div>
    );
}

export default ChatBubble;
