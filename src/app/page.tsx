'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TextMorph } from '@/components/ui/text-morph';
import { useTechAnimations } from '@/lib/tech-animations';
import { useVisitorNotification } from '@/lib/notify-service';
import IntroWrapper from '@/components/IntroWrapper'; 
import HeroSection from '@/components/HeroSection';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  const { 
    activeTitle, 
    activeTech, 
    handleTechClick, 
    handleHoverStart, 
    handleHoverEnd 
  } = useTechAnimations('Technologies', technologies);

  useEffect(() => {
    setMounted(true);
    
    document.body.classList.add('bg-zinc-900');
    
    return () => {
      document.body.classList.remove('bg-zinc-900');
    };
  }, []);

  useVisitorNotification();

  if (!mounted) return null;


  return (
    <IntroWrapper>
      <main className="bg-zinc-900 min-h-screen">
        {/* Use the hero section with updated name */}
        <HeroSection />

        <section
          id="skills"
          className="text-gray-100 px-4 sm:px-10 h-auto flex flex-col items-center mt-20"
        >
          <TextMorph 
            as="h1" 
            className="text-4xl sm:text-6xl font-bold mb-20 text-center"
          >
            {activeTitle}
          </TextMorph>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8 sm:gap-10 md:gap-12 w-full max-w-6xl">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group flex flex-col items-center"
                onHoverStart={() => handleHoverStart(tech.name)}
                onHoverEnd={handleHoverEnd}
                onClick={() => handleTechClick(tech.name)}
              >
                <motion.i
                  className={`
                    ${tech.icon} 
                    text-6xl sm:text-7xl 
                    cursor-pointer
                    ${activeTech === tech.name ? 'active-tech scale-110' : 'grayscale'} 
                    group-hover:grayscale-0 
                    ${tech.hoverClass}
                  `}
                  animate={{ 
                    scale: activeTech === tech.name ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ 
                    scale: 1.2,
                    transition: { 
                      scale: { duration: 0.1, ease: "easeOut" },
                    }
                  }}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="text-white px-4 sm:px-10 py-8 sm:mt-50 mt-40"
        >
          <h2 className="text-4xl sm:text-6xl font-bold mb-20 text-center md:-mt-16">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.a
                key={index}
                href={project.link}
                target="_blank"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="project relative overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 transform scale-110 group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-black opacity-60"></div>
                </div>

                <div className="relative z-10 p-6 pt-48 h-full flex flex-col justify-end text-white">
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 mb-2 text-xs sm:text-sm">
                    {project.technologies.map((tech, techIndex) => (
                      <div key={techIndex} className="flex items-center space-x-2">
                        <i className={`${tech.icon} text-3xl sm:text-4xl`}></i>
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>
      </main>
    </IntroWrapper>
  );
}

const technologies = [
  { name: 'HTML5', icon: 'devicon-html5-plain', hoverClass: 'group-hover:text-orange-500' },
  { name: 'CSS3', icon: 'devicon-css3-plain', hoverClass: 'group-hover:text-blue-500' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain', hoverClass: 'group-hover:text-yellow-400' },
  { name: 'React', icon: 'devicon-react-original', hoverClass: 'group-hover:text-cyan-400' },
  { name: 'Python', icon: 'devicon-python-plain', hoverClass: 'group-hover:text-blue-600' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain', hoverClass: 'group-hover:text-green-500' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain', hoverClass: 'group-hover:text-green-600' },
  { name: 'MySQL', icon: 'devicon-mysql-plain', hoverClass: 'group-hover:text-blue-400' },
  { name: 'Firebase', icon: 'devicon-firebase-plain', hoverClass: 'group-hover:text-yellow-500' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain', hoverClass: 'group-hover:text-cyan-500' },
  { name: 'Bootstrap', icon: 'devicon-bootstrap-plain', hoverClass: 'group-hover:text-purple-500' },
  { name: 'C#', icon: 'devicon-csharp-plain', hoverClass: 'group-hover:text-purple-600' },
];

const projects = [
  {
    title: 'Gym E-commerce Page',
    link: 'https://rossthesloth-gym.netlify.app',
    image: '/Gym-page.jpg',
    technologies: [
      { name: 'HTML', icon: 'devicon-html5-plain' },
      { name: 'CSS', icon: 'devicon-css3-plain' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain' },
      { name: 'Bootstrap', icon: 'devicon-bootstrap-plain' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
    ],
  },
  {
    title: 'Fitness Tracker',
    link: 'https://fitness-app-00.web.app',
    image: '/LogoFitnessApp.webp',
    technologies: [
      { name: 'React', icon: 'devicon-react-original' },
      { name: 'CSS', icon: 'devicon-css3-plain' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain' },
      { name: 'Tailwind', icon: 'devicon-tailwindcss-original' },
      { name: 'Firebase', icon: 'devicon-firebase-plain' },
    ],
  },
  {
    title: 'Stocks Analysis Chart',
    link: 'https://github.com/IbrahimElsa/Project1_Stocks',
    image: '/StocksProjectSS.png',
    technologies: [
      { name: 'C#', icon: 'devicon-csharp-plain' },
    ],
  },
];