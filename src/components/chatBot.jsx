'use client';
import { useState, useEffect, useRef } from 'react';
import useGeminiClient from '@/hooks/gemini-client';
import { Loader2, X, MessageSquareText, UserRound, Send } from 'lucide-react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I'm here to help you with digital literacy. Ask me about WhatsApp, Paytm, Google Maps, or try these quick options:",
      quickOptions: ["WhatsApp help", "Paytm guide", "Google Maps tutorial", "What is digital literacy?"],
    },
  ]);
  const { sendMessage, response, loading } = useGeminiClient();
  const messagesEndRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (response) {
      setMessages(prev => {
        const lastMessage = prev[prev.length - 1];
        if (lastMessage && lastMessage.sender === 'bot' && lastMessage.text === response) {
          return prev;
        }
        return [...prev, { sender: 'bot', text: response }];
      });
    }
  }, [response]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [messages, loading, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    await sendMessage(userMessage);
  };

  const handleQuickOptionClick = async (optionText) => {
    setMessages(prev => [...prev, { sender: 'user', text: optionText }]);
    await sendMessage(optionText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-4 rounded-full shadow-2xl text-white transition-all duration-300 transform hover:scale-110 active:scale-95 animate-bounce"
          style={{ zIndex: 10000 }}
          aria-label="Open Chatbot"
        >
          <MessageSquareText className="w-7 h-7" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
        </button>
      )}

      {/* Full Screen Backdrop with Blur */}
      {isOpen && (
        <div 
          className="fixed inset-0 transition-all duration-500 ease-out"
          style={{ 
            zIndex: 9998,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
          onClick={closeChat}
        />
      )}

      {/* Chatbot Widget Container */}
      {isOpen && (
        <div
          className="fixed top-1/2 left-1/2 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-2rem)] bg-[#1e293b] rounded-2xl shadow-2xl flex flex-col transition-all duration-500 ease-out transform -translate-x-1/2 -translate-y-1/2"
          style={{ zIndex: 9999 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <UserRound className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white"></span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">DLC Assistant</h3>
                <span className="text-green-200 text-sm flex items-center">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                  </span>
                  Online
                </span>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all duration-200"
              aria-label="Close Chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Display Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#1e293b] text-white">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm transition-all duration-200
                    ${msg.sender === 'user'
                      ? 'bg-[#FFFFFF] text-gray-800 rounded-br-md hover:bg-[#a3d274] shadow-sm' 
                      : 'bg-[#FFFFFF] text-white rounded-bl-md hover:bg-[#cb7be6] shadow-sm'
                    }`}
                >
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({node, ...props}) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" 
                           className={`${msg.sender === 'user' ? 'text-blue-600' : 'text-blue-400'} hover:underline`} />
                      ),
                      p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-inside ml-2 space-y-1" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal list-inside ml-2 space-y-1" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
                      code: ({node, ...props}) => (
                        <code className={`${msg.sender === 'user' ? 'bg-gray-100' : 'bg-[#475569]'} px-1 py-0.5 rounded text-sm`} {...props} />
                      ),
                      pre: ({node, ...props}) => (
                        <pre className={`${msg.sender === 'user' ? 'bg-gray-100' : 'bg-[#475569]'} p-3 rounded-lg overflow-auto my-2 text-sm`} {...props} />
                      ),
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>

                  {/* Quick Options for Bot Message */}
                  {msg.sender === 'bot' && msg.quickOptions && (
                    <div className="grid grid-cols-1 gap-2 mt-3">
                      {msg.quickOptions.map((option, optionIdx) => (
                        <button
                          key={optionIdx}
                          onClick={() => handleQuickOptionClick(option)}
                          className="bg-white hover:bg-gray-100 text-gray-700 text-xs px-3 py-2 rounded-lg transition-all duration-200 shadow-sm"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 bg-[#334155] text-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <Loader2 className="animate-spin w-4 h-4 text-purple-500" />
                  <span className="text-sm">Assistant is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-[#1e293b] border-t border-[#334155] rounded-b-2xl">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  className="w-full bg-[#334155] border border-[#475569] rounded-xl px-4 py-3 pr-12 placeholder:text-[#94a3b8] text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none min-h-[44px] max-h-32"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={handleKeyPress}
                  disabled={loading}
                  rows={1}
                  style={{
                    height: 'auto',
                    minHeight: '44px'
                  }}
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                  }}
                />
              </div>
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-3 rounded-xl text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg active:scale-95"
                disabled={loading || !input.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </>
  );
}