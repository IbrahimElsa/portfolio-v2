'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Social links data for reuse
  const socialLinks = [
    { href: "https://github.com/IbrahimElsa", icon: "devicon-github-original", label: "GitHub" },
    { href: "https://linkedin.com/in/ibrahim-elsawalhi", icon: "devicon-linkedin-plain", label: "LinkedIn" },
    { href: "mailto:ibrahim@example.com", icon: "fas fa-envelope", label: "Email" }
  ];

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate navbar styles based on scroll position
  const isScrolled = scrollPosition > 50;
  
  return (
    <nav 
      className={cn(
        "fixed w-full z-20 transition-all duration-300",
        isScrolled ? "bg-zinc-900/70 backdrop-blur-sm shadow-md" : "bg-transparent"
      )}
    >
      {/* Fixed-position bar for absolute positioning of elements */}
      <div className="relative h-[120px]">
        {/* Logo area - left side, no positioning needed as it's already there */}
        <div className="absolute left-0 top-0 w-[120px] h-[120px]"></div>
        
        {/* Social links - desktop, absolutely positioned at the right edge */}
        <div className="absolute right-6 top-0 h-[120px] hidden md:flex items-center">
          {socialLinks.map((link, index) => (
            <div key={link.label} className="flex items-center">
              <SocialLink 
                href={link.href} 
                icon={link.icon} 
                label={link.label}
              />
              {index < socialLinks.length - 1 && (
                <span className="text-gray-400 text-lg mx-3">✕</span>
              )}
            </div>
          ))}
        </div>
        
        {/* Mobile menu button - absolutely positioned at the right edge */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="absolute right-6 top-0 h-[120px] md:hidden text-gray-100 focus:outline-none flex items-center"
          aria-label="Toggle mobile menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-zinc-800/90 backdrop-blur-sm mx-4 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="px-4 py-4">
            <div className="flex justify-around py-3">
              {socialLinks.map((link) => (
                <SocialLink 
                  key={link.label}
                  href={link.href} 
                  icon={link.icon} 
                  label={link.label}
                  isMobile
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

// Social link component
function SocialLink({ 
  href, 
  icon, 
  label,
  isMobile = false
}: { 
  href: string; 
  icon: string; 
  label: string;
  isMobile?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "text-gray-300 hover:text-white transition-all duration-200 ",
        isMobile ? "text-3xl" : "text-2xl sm:text-3xl hover:scale-110"
      )}
      aria-label={label}
    >
      <i className={icon}></i>
    </a>
  );
}