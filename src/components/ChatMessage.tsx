import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';

interface ChatMessageProps {
  isBot: boolean;
  message: string | React.ReactNode;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ isBot, message }) => {
  return (
    <div className={`flex items-start gap-4 ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      <div className={`max-w-[70%] rounded-lg p-4 ${
        isBot ? 'bg-blue-50' : 'bg-green-50'
      }`}>
        <div className="text-gray-800">{message}</div>
      </div>
      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
      )}
    </div>
  );
};