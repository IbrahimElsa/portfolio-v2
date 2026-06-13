import BootSequence from "@/components/BootSequence";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import PatchPanel from "@/components/PatchPanel";
import DriveBays from "@/components/DriveBays";
import LabSection from "@/components/LabSection";
import ContactConsole from "@/components/ContactConsole";
import VisitorPing from "@/components/VisitorPing";

export default function Home() {
  return (
    <main className="relative">
      <BootSequence />
      <VisitorPing />
      <Hero />
      <Marquee />
      <PatchPanel />
      <DriveBays />
      <LabSection />
      <ContactConsole />
    </main>
  );
}
