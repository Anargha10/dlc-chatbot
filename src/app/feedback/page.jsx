// app/feedback/page.js
'use client';

// import { motion } from 'framer-motion'; // Uncomment if using Framer Motion
import { MessageSquareText } from 'lucide-react'; // Icon for feedback

export default function FeedbackPage() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // --- Google Forms Integration (Client-side via hidden iframe) ---
    // These are the ACTUAL values extracted from your provided Google Form link:
    const GOOGLE_FORM_BASE_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe8CNJkPBZMEk91Re_Je5CXt0qfMaA59qxbdiHYQnXoNqlT8w/formResponse";
    const ENTRY_ID_NAME = "entry.2082260762";
    const ENTRY_ID_EMAIL = "entry.267099079";
    const ENTRY_ID_FEEDBACK = "entry.2003065903";

    const queryString = new URLSearchParams({
      [ENTRY_ID_NAME]: data.name,
      [ENTRY_ID_EMAIL]: data.email,
      [ENTRY_ID_FEEDBACK]: data.feedback,
    }).toString();

    const finalUrl = `${GOOGLE_FORM_BASE_URL}?${queryString}`;

    // Create a hidden iframe to submit the form data without page reload
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none'; // Keep it hidden from view
    iframe.src = finalUrl;
    document.body.appendChild(iframe); // Append to body to trigger the request

    // Add event listeners for success/failure
    iframe.onload = () => {
      // The form has been submitted to Google Forms
      alert('Thank you for your valuable feedback! We appreciate it.');
      e.target.reset(); // Reset form fields after successful submission
      document.body.removeChild(iframe); // Clean up the iframe from the DOM
    };

    iframe.onerror = () => {
        alert('There was an error submitting your feedback. Please try again.');
        document.body.removeChild(iframe); // Clean up the iframe even if there's an error
    };
    // --- End Google Forms Integration ---
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center p-6 md:p-10 lg:p-16 pt-28 relative">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 drop-shadow-lg text-center animate-fade-in">
        Help Us Grow: Your Voice Matters
      </h1>
      <p className="text-lg md:text-xl text-white/80 max-w-3xl text-center mb-12 animate-fade-in delay-200">
        Share your thoughts, suggestions, and experiences. Every piece of feedback helps us refine our mission to empower digital literacy.
      </p>

      <div className="w-full max-w-2xl bg-[#1e293b] rounded-xl shadow-lg border border-[#334155] p-6 md:p-8 lg:p-10 animate-fade-in delay-400">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-200 text-sm font-semibold mb-2">Your Name</label>
            <input
              type="text"
              id="name"
              name="name" // Important: 'name' attribute matches `data.name`
              className="w-full p-3 bg-[#334155] border border-[#475569] rounded-md text-[#fbfbfb] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-200 text-sm font-semibold mb-2">Your Email</label>
            <input
              type="email"
              id="email"
              name="email" // Important: 'name' attribute matches `data.email`
              className="w-full p-3 bg-[#334155] border border-[#475569] rounded-md text-[#fbfbfb] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
              placeholder="john.doe@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="feedback" className="block text-gray-200 text-sm font-semibold mb-2">Your Feedback</label> {/* Adjusted color to gray-200 for consistency */}
            <textarea
              id="feedback"
              name="feedback" // Important: 'name' attribute matches `data.feedback`
              rows="7"
              className="w-full p-3 bg-[#334155] border border-[#475569] rounded-md text-[#fbfbfb] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-y transition-colors"
              placeholder="I found the tutorials very helpful, especially..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center gap-2"
          >
            <MessageSquareText className="w-5 h-5" /> Send Your Feedback
          </button>
        </form>
      </div>
    </main>
  );
}