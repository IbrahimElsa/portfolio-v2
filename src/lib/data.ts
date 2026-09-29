export interface Tech {
  name: string;
  /** devicon class, e.g. "devicon-react-original" */
  icon?: string;
  /** Path to a custom SVG in /public for logos devicon lacks. */
  customIcon?: string;
}

export interface Project {
  title: string;
  description: string;
  link: string;
  image: string;
  /** "contain" shows a logo on a padded surface instead of a cropped cover. */
  imageFit?: 'cover' | 'contain';
  status?: 'live' | 'in-progress';
  technologies: Tech[];
}

export const technologies: Tech[] = [
  { name: 'HTML5', icon: 'devicon-html5-plain' },
  { name: 'CSS3', icon: 'devicon-css3-plain' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain' },
  { name: 'React', icon: 'devicon-react-original' },
  { name: 'Next.js', customIcon: '/nextjs-icon.svg' },
  { name: 'Angular', icon: 'devicon-angularjs-plain' },
  { name: 'Python', icon: 'devicon-python-plain' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain' },
  { name: 'Express', icon: 'devicon-express-original' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
  { name: 'Git', icon: 'devicon-git-plain' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain' },
  { name: 'Supabase', icon: 'devicon-supabase-plain' },
  { name: 'Firebase', icon: 'devicon-firebase-plain' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain' },
  { name: 'Bootstrap', icon: 'devicon-bootstrap-plain' },
  { name: 'C#', icon: 'devicon-csharp-plain' },
];

export const projects: Project[] = [
  {
    title: 'folio.dev',
    description:
      'A portfolio builder for developers. Pick a template, connect your projects and publish in minutes.',
    link: '#',
    image: '/favicon-light.svg',
    imageFit: 'contain',
    status: 'in-progress',
    technologies: [
      { name: 'Next.js', customIcon: '/nextjs-icon.svg' },
      { name: 'Supabase', icon: 'devicon-supabase-plain' },
      { name: 'Tailwind', icon: 'devicon-tailwindcss-plain' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain' },
    ],
  },
  {
    title: 'Fitness Tracker',
    description:
      'Log workouts, track sets and reps, and watch progress over time. React front end backed by Firebase.',
    link: 'https://fitness-app-00.web.app',
    image: '/LogoFitnessApp.webp',
    status: 'live',
    technologies: [
      { name: 'React', icon: 'devicon-react-original' },
      { name: 'Tailwind', icon: 'devicon-tailwindcss-plain' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain' },
      { name: 'Firebase', icon: 'devicon-firebase-plain' },
    ],
  },
  {
    title: 'Gym E-commerce Page',
    description:
      'Storefront concept for a gym: product catalogue, cart flow and a responsive layout built with Bootstrap.',
    link: 'https://rossthesloth-gym.netlify.app',
    image: '/Gym-page.jpg',
    status: 'live',
    technologies: [
      { name: 'HTML', icon: 'devicon-html5-plain' },
      { name: 'CSS', icon: 'devicon-css3-plain' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain' },
      { name: 'Bootstrap', icon: 'devicon-bootstrap-plain' },
      { name: 'MongoDB', icon: 'devicon-mongodb-plain' },
    ],
  },
  {
    title: 'Stocks Analysis Chart',
    description:
      'C# desktop app that loads historical stock data and renders it as interactive analysis charts.',
    link: 'https://github.com/IbrahimElsa/Project1_Stocks',
    image: '/StocksProjectSS.png',
    status: 'live',
    technologies: [{ name: 'C#', icon: 'devicon-csharp-plain' }],
  },
];
