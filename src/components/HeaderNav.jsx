'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Use Link for client-side navigation
import { BookOpen, MessageCircle, Mic, Globe, Sun, Moon, Maximize, Minimize } from 'lucide-react'; // Icons

export default function HeaderNav() {
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('dark');
  const [voiceCommandActive, setVoiceCommandActive] = useState(false);
  const [activePath, setActivePath] = useState('/'); // To highlight active link

  useEffect(() => {
    // This is a client component, so window is available
    if (typeof window !== 'undefined') {
      setActivePath(window.location.pathname);
    }
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const changeLanguage = (lang) => {
    console.log(`Changing language to: ${lang}`);
    // For production, integrate with a proper i18n library like 'next-i18next' or 'react-i18next'
  };

  const NavLink = ({ href, children, icon: Icon }) => (
    <Link href={href} passHref>
      <button className={`text-white hover:text-purple-400 transition-colors duration-200 text-lg font-medium py-2 px-4 rounded-md flex items-center justify-center gap-2 w-[100px] h-[40px]
        ${activePath === href ? 'bg-purple-700/30 text-purple-400 underline underline-offset-4' : ''}`}>
        {Icon && <Icon className="w-4 h-4" />} 
        <span className="whitespace-nowrap">{children}</span>
      </button>
    </Link>
  );

  return (
    <nav className="w-full max-w-7xl flex flex-end justify-between items-center py-4 px-6 bg-[#1e293b]/70 backdrop-blur-sm rounded-full shadow-lg border border-[#334155] z-50 fixed top-4 left-1/2 transform -translate-x-1/2">
      <Link className="flex items-center space-x-2" href={'/'}>
        <img src="/collegetips-logo.jpeg" alt="Collegetips.in Logo" className="h-1 md:h-5 w-1/12" />
      </Link>
      <div className="flex flex-end px-4 justify-center space-x-4 mt-3 md:mt-0 mr-10">
        <NavLink href="/" icon={null}>Home</NavLink>
        <NavLink href="/tutorials" icon={BookOpen}>Tutorials</NavLink>
        <NavLink href="/chat" icon={MessageCircle}>AI Chat</NavLink>
        <NavLink href="/feedback" icon={null}>Feedback</NavLink>
      </div>
    </nav>
  );
}