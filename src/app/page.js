// src/app/page.js
import ChatBot from '@/components/chatBot';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center p-6 relative">
      {/* Welcome Message Box */}
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl text-white max-w-2xl text-center animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome to the Digital Literacy Campaign by Collegetips.in.
        </h1>
        <p className="text-lg md:text-xl text-white/90">
          Click the chat button in the bottom right to get started!
        </p>
      </div>

      {/* The ChatBot component will now handle its own floating position and toggle */}
      <ChatBot />
    </main>
  );
}