'use client';
import { useState } from 'react';

export default function useGeminiClient() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    try {
      setLoading(true);
      setResponse('');
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.text || 'No response from Gemini.');
    } catch (err) {
      console.error('Gemini error:', err);
      setResponse('❌ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, response, loading };
}
