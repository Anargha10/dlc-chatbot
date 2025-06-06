// src/app/layout.js
import './globals.css'; // <--- THIS IS THE MISSING PIECE!

export const metadata = {
  title: 'Collegetips DLC Chatbot',
  description: 'Your ultimate digital literacy guide!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}