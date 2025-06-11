import './globals.css';
import HeaderNav from '@/components/HeaderNav';
import ChatBot from '@/components/chatBot';
import AnimatedBackground from '@/components/AnimatedBackground'; // ✅ new import

export const metadata = {
  title: 'Collegetips.in - Empowering Digital Literacy',
  description: 'Your guide to navigating the digital world with confidence.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <HeaderNav />
        {children}
        
        <AnimatedBackground /> {/* ✅ add client-side animation safely */}
      </body>
    </html>
  );
}
