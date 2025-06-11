// app/page.js
// No 'use client' needed here if it's purely static, but often included for consistency
// and potential client-side features like animations.
'use client'; // Keeping for potential Framer Motion/GSAP animations

import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    gsap.fromTo(".hero-title", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    gsap.fromTo(".hero-tagline", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" });
    gsap.fromTo(".hero-button", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, delay: 0.6, ease: "back.out(1.7)" });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic background element for storytelling (conceptual GSAP/Framer Motion) */}
      <div className="absolute inset-0 z-0 opacity-15">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }} 
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl top-1/4 left-1/4"
        />
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }} 
          transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }} 
          className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl bottom-1/3 right-1/4"
        />
      </div>

      {/* Welcome Message Box - Enhanced for storytelling */}
      <div className="relative z-10 bg-white/5 backdrop-blur-xl p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl text-white max-w-4xl text-center border border-white/10 animate-fade-in-up">
        <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-wide drop-shadow-xl leading-tight">
          Welcome to <span className="text-purple-400">Collegetips.in</span>
        </h1>
        <p className="hero-tagline text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto mb-10 font-light">
          **Empowering Digital Literacy!** Navigate the digital world with confidence, one skill at a time.
        </p>
        <Link href="/tutorials" passHref>
          <button className="hero-button bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center gap-3 mx-auto">
            <BookOpen className="w-6 h-6" /> Start Your Digital Journey
          </button>
        </Link>
      </div>

      {/* Add subtle CSS animations for initial load */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}