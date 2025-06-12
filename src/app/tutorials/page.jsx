// app/tutorials/page.js
'use client'; // For client-side state and potentially Framer Motion/GSAP on cards

 import { motion } from 'framer-motion'; // Uncomment if using Framer Motion
import { Send } from 'lucide-react'; // Icon for 'Watch Tutorial'

// Mock data for tutorials - in a real app, this would come from an API or CMS
const tutorialsData = [
  { id: 'whatsapp', title: 'WhatsApp Fundamentals', description: 'Learn to connect, share, and communicate securely with friends and family.', icon: '/whatsapp.png', videoUrl: 'https://www.internetmatters.org/advice/apps-and-platforms/social-media/whatsapp/' }, // Replace with real video links
  { id: 'paytm', title: 'Paytm: Digital Payments Made Easy', description: 'Master cashless transactions, bill payments, and financial services on the go.', icon: '/paytm.png', videoUrl: 'https://paytm.com/blog/paytm-help/' },
  { id: 'googlemaps', title: 'Google Maps: Explore Your World', description: 'Navigate new cities, find places, get directions, and discover local gems.', icon: '/googlemaps.png', videoUrl: 'https://support.google.com/maps/answer/3273406?hl=en&co=GENIE.Platform%3DAndroid' },
  { id: 'digilit', title: 'What is Digital Literacy?', description: 'Understand the core concepts and importance of navigating the modern digital landscape.', icon: '/digilit.png', videoUrl: 'https://en.wikipedia.org/wiki/Digital_literacy' },
  { id: 'email', title: 'Email Essentials: Stay Connected', description: 'Learn to send, receive, and manage emails effectively for personal and professional use.', icon: '/email.svg', videoUrl: 'https://profiletree.com/how-to-use-email/' }, // Assuming you'd add this icon
  { id: 'socialmedia', title: 'Safe Social Media Habits', description: 'Discover best practices for privacy, security, and responsible engagement on social platforms.', icon: '/socialmedia.svg', videoUrl: 'https://www.webfx.com/blog/social-media/social-media-101/#:~:text=Post%20content%20often&text=To%20ensure%20that%20users%20can,that%20you%20post%20content%20frequently.' }, // Assuming you'd add this icon
];

export default function TutorialsPage() {
  // Conceptual: Framer Motion variants for card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center p-6 md:p-10 lg:p-16 pt-28 relative">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#ffffff] mb-12 drop-shadow-lg text-center animate-fade-in">
        Your Gateway to Digital Mastery
      </h1>
      <p className="text-lg md:text-xl text-[#ffffff]/80 max-w-3xl text-center mb-16 animate-fade-in delay-200">
        Explore our curated collection of easy-to-follow tutorials designed to build your confidence in the digital world.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 w-full max-w-7xl">
        {tutorialsData.map((tutorial, index) => (
           <motion.div // Uncomment if using Framer Motion
             key={tutorial.id}
           variants={cardVariants}
           initial="hidden"
           whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
           transition={{ delay: index * 0.1 }} // Staggered animation
         >
            <div className="bg-[#1e293b] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group border border-[#334155] hover:border-[#a855f7] transform hover:-translate-y-2">
              <div className="relative h-48 bg-[#374151] flex items-center justify-center overflow-hidden">
                {/* Conceptual video/image thumbnail */}
                {tutorial.videoUrl ? (
                    <iframe
                      src={tutorial.videoUrl.replace("watch?v=", "embed/") + "?controls=0&modestbranding=1&rel=0"} // Embed YouTube
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    ></iframe>
                ) : (
                    <img src={tutorial.icon} alt={`${tutorial.title} icon`} className="w-24 h-24 object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                <div className="absolute inset-0 bg-[#000000]/40 group-hover:bg-[#91a2bd] flex items-center justify-center transition-all duration-300">
                    <button
                        onClick={() => window.open(tutorial.videoUrl, '_blank')} // Open video in new tab for now
                        className="p-3 bg-[#9333ea] rounded-full opacity-0 group-hover:opacity-100 transform translate-y-5 group-hover:translate-y-0 transition-all duration-300 ease-out shadow-lg hover:scale-110"
                        aria-label={`Watch ${tutorial.title}`}
                    >
                        <Send className="w-6 h-6 text-[#ffffff] rotate-45" /> {/* Play icon, rotated */}
                    </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-[#ffffff] mb-3 group-hover:text-[#c084fc] transition-colors duration-300 leading-tight">
                  {tutorial.title}
                </h3>
                <p className="text-[#d1d5db] text-base mb-4 line-clamp-3">{tutorial.description}</p>
                <button
                  onClick={() => window.open(tutorial.videoUrl, '_blank')} // Open in new tab
                  className="inline-flex items-center gap-2 text-[#c084fc] hover:text-[#d8b4fe] font-medium transition-colors duration-200 group-hover:translate-x-1 transition-transform"
                >
                  Learn More <Send className="w-4 h-4 transform -rotate-45" />
                </button>
              </div>
            </div>
           </motion.div> // Uncomment if using Framer Motion
        ))}
      </div>
    </main>
  );
}