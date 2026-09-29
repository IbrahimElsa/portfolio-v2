'use client';

import { useVisitorNotification } from '@/lib/notify-service';
import IntroWrapper from '@/components/IntroWrapper';
import HeroSection from '@/components/HeroSection';
import ProjectsSection from '@/components/ProjectsSection';
import TechSection from '@/components/TechSection';
import CreatorSection from '@/components/CreatorSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  useVisitorNotification();

  return (
    <IntroWrapper>
      <main className="bg-dots">
        <HeroSection />
        <CreatorSection />
        <TechSection />
        <ProjectsSection />
      </main>
      <ContactSection />
    </IntroWrapper>
  );
}
