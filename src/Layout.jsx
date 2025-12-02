import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
        
        :root {
          --tipsy-aqua: #00C2D1;
          --neon-purple: #8A2BE2;
          --warm-coral: #FF6F61;
          --deep-black: #0A0A0A;
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Fredoka', sans-serif;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, var(--tipsy-aqua), var(--neon-purple));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0, 194, 209, 0.15);
        }
      `}</style>
      
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}