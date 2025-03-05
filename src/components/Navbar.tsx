'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll event to add background when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed w-full z-20 transition-all duration-300">
      {/* Main navigation bar aligned with the middle of logo */}
      <div className="flex items-center">
        {/* Left space for logo - ensures consistent positioning with the 3D logo */}
        <div className="w-24 sm:w-28"></div>
        
        {/* Spacer to push content to the right */}
        <div className="flex-grow"></div>
        
        {/* Social links - desktop - positioned to align with middle of the logo */}
        <div className="hidden md:flex items-center pr-6 mt-[54px] sm:mt-[74px]">
          <SocialLink 
            href="https://github.com/IbrahimElsa" 
            icon="devicon-github-original" 
            label="GitHub"
          />
          <span className="text-gray-400 text-lg mx-3">✕</span>
          <SocialLink 
            href="https://linkedin.com/in/ibrahim-elsawalhi" 
            icon="devicon-linkedin-plain" 
            label="LinkedIn"
          />
          <span className="text-gray-400 text-lg mx-3">✕</span>
          <SocialLink 
            href="mailto:ibrahim@example.com" 
            icon="fas fa-envelope" 
            label="Email"
          />
        </div>
        
        {/* Mobile menu button - aligned with the middle of the logo */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-gray-100 focus:outline-none pr-4 sm:pr-6 mt-[54px] sm:mt-[74px]"
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
          className="md:hidden bg-zinc-800 mt-3 mx-4 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="px-4 py-4">
            <div className="flex justify-around py-3">
              <SocialLink 
                href="https://github.com/IbrahimElsa" 
                icon="devicon-github-original" 
                label="GitHub"
                isMobile
              />
              <SocialLink 
                href="https://linkedin.com/in/ibrahim-elsawalhi" 
                icon="devicon-linkedin-plain" 
                label="LinkedIn"
                isMobile
              />
              <SocialLink 
                href="mailto:ibrahim@example.com" 
                icon="fas fa-envelope" 
                label="Email"
                isMobile
              />
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
        "text-gray-300 hover:text-white transition-all duration-200",
        isMobile ? "text-3xl" : "text-2xl sm:text-3xl hover:scale-110"
      )}
      aria-label={label}
    >
      <i className={icon}></i>
    </a>
  );
}