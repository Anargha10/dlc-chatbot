// File: app/api/chat/route.ts (App Router - API route)
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req) {
  try {
    const { message } = await req.json();

    const prompt = `
You are a helpful assistant for Digital Literacy Campaign (DLC). 
You only answer beginner-friendly, simple questions about tools like:
- WhatsApp
- Google Pay
- UPI
- YouTube
- Paytm
- QR codes
- Smartphone features
- Google Maps
- Digital safety, scams, and tech terms

Explain using step-by-step instructions. Be short, kind, and crystal clear. 
User asked: "${message}"
    `;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Gemini API error:', error);
    return NextResponse.json({ error: 'Failed to get response from Gemini' }, { status: 500 });
  }
}
