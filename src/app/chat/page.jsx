// app/chat/page.js
'use client';

import ChatBot from "@/components/chatBot";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center p-6 pt-28 relative">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 drop-shadow-lg text-center animate-fade-in">
        Your Personal Digital Guide: DigiBuddy
      </h1>
      <p className="text-lg md:text-xl text-white/80 max-w-3xl text-center mb-12 animate-fade-in delay-200">
        Have questions? Need instant help? Our AI assistant, DigiBuddy, is ready to chat.
      </p>
      <p className="text-gray-400 text-base animate-fade-in delay-400">
        Click the glowing chat icon  to open DigiBuddy and start your conversation!
      </p>
      {/* The actual ChatBot modal is rendered via layout.js */}
      <ChatBot/>
    </main>
  );
}