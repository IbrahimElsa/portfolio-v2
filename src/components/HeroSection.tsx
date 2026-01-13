import React from 'react';
import { TextMorph } from '@/components/ui/text-morph';

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Dreamy gradient background with blur effect - improved cross-browser compatibility */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base gradient background - more consistent across browsers */}
        <div 
          className="absolute inset-0 bg-[#2D1B69] bg-opacity-90"
          style={{
            backgroundImage: 'linear-gradient(to bottom right, #2D1B69, #1F1147, #191042)',
          }}
        />
        
        {/* Fixed, explicitly positioned orbs with slow animation for better cross-browser consistency */}
        <div 
          className="absolute top-[15%] left-[20%] w-[450px] h-[450px] rounded-full bg-[#4B2C85]"
          style={{
            filter: 'blur(80px)',
            opacity: 0.6,
            animation: 'float1 25s ease-in-out infinite',
          }}
        />
        
        <div 
          className="absolute top-[40%] right-[25%] w-[400px] h-[400px] rounded-full bg-[#2C3E85]"
          style={{
            filter: 'blur(70px)',
            opacity: 0.5,
            animation: 'float2 30s ease-in-out infinite',
          }}
        />
        
        <div 
          className="absolute bottom-[20%] right-[35%] w-[350px] h-[350px] rounded-full bg-[#48277B]"
          style={{
            filter: 'blur(70px)',
            opacity: 0.5,
            animation: 'float3 20s ease-in-out infinite',
          }}
        />
        
        {/* CSS animations for the floating effect */}
        <style jsx>{`
          @keyframes float1 {
            0% { transform: translate(0, 0); }
            25% { transform: translate(30px, -20px); }
            50% { transform: translate(10px, 30px); }
            75% { transform: translate(-20px, 10px); }
            100% { transform: translate(0, 0); }
          }
          
          @keyframes float2 {
            0% { transform: translate(0, 0); }
            33% { transform: translate(-25px, 15px); }
            66% { transform: translate(25px, 20px); }
            100% { transform: translate(0, 0); }
          }
          
          @keyframes float3 {
            0% { transform: translate(0, 0); }
            50% { transform: translate(25px, -15px); }
            100% { transform: translate(0, 0); }
          }
        `}</style>
      </div>

      {/* Optional overlay to ensure smooth transition to your site's base color */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-900 to-transparent z-10"></div>

      {/* Content container */}
      <div className="relative z-20 text-center px-4">
        <div className="max-w-4xl mx-auto">
          {/* Name with gradient text effect */}
          <div className="mb-4 relative">
            <TextMorph 
              as="h1" 
              className="font-bold text-4xl sm:text-5xl md:text-7xl lg:text-8xl
                        text-transparent"
              style={{
                backgroundImage: 'linear-gradient(to right, #c88dba 15%, #a88fcc 50%, #c8b39e 85%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Ibrahim Elsawalhi
            </TextMorph>
          </div>
          
          {/* Title text */}
          <TextMorph 
            as="h2" 
            className="text-2xl sm:text-3xl md:text-4xl lg:whitespace-nowrap mt-2 mb-8
                     text-gray-100 font-light tracking-wide"
            style={{
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Full Stack Developer
          </TextMorph>
          
          {/* Action buttons */}
          <div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8"
          >
            <a
              href="/IbrahimElsawalhiResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#7928CA] hover:bg-[#8A3DD9]
                         text-white rounded-md
                         transition-all duration-300 hover:scale-105 shadow-lg
                         flex items-center justify-center 
                         space-x-2 w-48 sm:w-auto font-medium"
              aria-label="Download Resume"
            >
              <i className="fas fa-file-alt"></i>
              <span>View Resume</span>
            </a>
            
            <a
              href="#projects"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg
                         text-white rounded-md border border-white/20
                         hover:bg-white/20 transition-all duration-300 
                         hover:scale-105 shadow-lg flex items-center 
                         justify-center space-x-2 w-48 sm:w-auto"
              aria-label="View Projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <i className="fas fa-code"></i>
              <span>View Projects</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-12 left-0 right-0 flex justify-center z-20 animate-bounce"
        style={{ animation: 'bounce 2s infinite' }}
      >
        <button className="text-gray-300 hover:text-white transition duration-200 focus:outline-none">
          <svg
            className="w-8 h-8 sm:w-10 sm:h-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}