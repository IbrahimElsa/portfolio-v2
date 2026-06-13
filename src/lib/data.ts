// Single source of truth for site content.

export const HANDLE = "bigibz1";

// Used by the hero uptime counter — set this to when you started writing code.
export const BOOT_DATE = new Date("2021-09-01T00:00:00Z");

export type Skill = {
  name: string;
  category: string;
};

// Laid out as a 24-port patch panel; empty ports are padded in automatically.
export const SKILLS: Skill[] = [
  { name: "TypeScript", category: "LANGUAGE" },
  { name: "JavaScript", category: "LANGUAGE" },
  { name: "Python", category: "LANGUAGE" },
  { name: "C#", category: "LANGUAGE" },
  { name: "React", category: "FRAMEWORK" },
  { name: "Next.js", category: "FRAMEWORK" },
  { name: "Angular", category: "FRAMEWORK" },
  { name: "Node.js", category: "RUNTIME" },
  { name: "Express", category: "BACKEND" },
  { name: "Supabase", category: "BACKEND" },
  { name: "Firebase", category: "BACKEND" },
  { name: "PostgreSQL", category: "DATABASE" },
  { name: "MongoDB", category: "DATABASE" },
  { name: "HTML5", category: "MARKUP" },
  { name: "CSS3", category: "STYLE" },
  { name: "Tailwind", category: "STYLE" },
  { name: "Bootstrap", category: "STYLE" },
  { name: "Git", category: "TOOLING" },
  { name: "Docker", category: "HOMELAB" },
  { name: "Linux", category: "HOMELAB" },
  { name: "Proxmox", category: "HOMELAB" },
  { name: "Networking", category: "HOMELAB" },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  imageFit?: "cover" | "contain";
  tech: string[];
  status: "DEPLOYED" | "IN DEVELOPMENT" | "ARCHIVED";
};

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "FOLIO.DEV",
    description: "Portfolio platform for developers",
    link: "#",
    image: "/favicon-light.svg",
    imageFit: "contain",
    tech: ["Next.js", "Supabase", "Tailwind", "TypeScript"],
    status: "IN DEVELOPMENT",
  },
  {
    id: "02",
    title: "FITNESS TRACKER",
    description: "Workout logging with live progress charts",
    link: "https://fitness-app-00.web.app",
    image: "/LogoFitnessApp.webp",
    tech: ["React", "Firebase", "Tailwind", "JavaScript"],
    status: "DEPLOYED",
  },
  {
    id: "03",
    title: "GYM E-COMMERCE",
    description: "Storefront for gym apparel and gear",
    link: "https://rossthesloth-gym.netlify.app",
    image: "/Gym-page.jpg",
    tech: ["HTML", "CSS", "Bootstrap", "MongoDB"],
    status: "DEPLOYED",
  },
  {
    id: "04",
    title: "STOCKS ANALYSIS",
    description: "Desktop charting for equities data",
    link: "https://github.com/IbrahimElsa/Project1_Stocks",
    image: "/StocksProjectSS.png",
    tech: ["C#", ".NET"],
    status: "ARCHIVED",
  },
];

export type Channel = {
  platform: string;
  containerId: string;
  image: string;
  status: string;
  ports: string;
  url: string;
};

// Rendered as `docker ps` output in the lab section.
export const CHANNELS: Channel[] = [
  {
    platform: "YOUTUBE",
    containerId: "a1b2c3d4e5f6",
    image: `${HANDLE}/youtube:latest`,
    status: "Up — uploading",
    ports: "443->homelab",
    url: `https://youtube.com/@${HANDLE}`,
  },
  {
    platform: "TIKTOK",
    containerId: "f6e5d4c3b2a1",
    image: `${HANDLE}/tiktok:latest`,
    status: "Up — posting",
    ports: "443->shorts",
    url: `https://tiktok.com/@${HANDLE}`,
  },
  {
    platform: "INSTAGRAM",
    containerId: "0badc0ffee12",
    image: `${HANDLE}/instagram:latest`,
    status: "Up — posting",
    ports: "443->reels",
    url: `https://instagram.com/${HANDLE}`,
  },
];

export const CONTACT = {
  email: "rossthesloth900@gmail.com",
  github: "https://github.com/IbrahimElsa",
  linkedin: "https://linkedin.com/in/ibrahim-elsawalhi",
  resume: "/IbrahimElsawalhiResume.pdf",
};
