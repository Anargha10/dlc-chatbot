'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamically import components with loading fallbacks
const HeaderNav = dynamic(() => import('@/components/HeaderNav.jsx'), {
  ssr: false,
  loading: () => <div className="h-16 bg-[#1e293b]/70 backdrop-blur-sm rounded-full shadow-lg border border-[#334155] z-50 fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-7xl" />
});

const ChatBot = dynamic(() => import('@/components/chatBot.jsx'), {
  ssr: false,
  loading: () => null // Don't show anything while loading the chat
});

export default function ClientLayout({ children }) {
  return (
    <>
      <Suspense fallback={null}>
        <HeaderNav />
      </Suspense>
      {children}
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
    </>
  );
} 