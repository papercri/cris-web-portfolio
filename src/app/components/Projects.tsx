import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const VP = { once: false, margin: '-80px' };
const VP2 = { once: false, margin: '-40px' };

export function Projects() {
  const projects = [
    {
      id: 'travel-planner',
      title: 'Trip Taylor',
      imageUrl: '/trip-tailor.jpg',
      description: 'AI-powered travel planner web app that helps users discover destinations and get personalized travel recommendations. Built with modern technologies, it allows users to explore cities, view key information, and plan their trips through an interactive assistant.',
      highlights: [
        'Generates personalized itineraries using dynamic OpenAI prompts, adapting recommendations to user preferences, budget, and travel style.',
        'Built with Next.js, TypeScript, Tailwind, and Firebase, including authentication and full CRUD functionality so users can save, edit, and manage their trips.',
        'Optimized data architecture with multiple travel APIs combined into a single request, reducing load times and improving performance and user experience.',
        
      ],
      tags: ['NEXT', 'TAILWIND', 'TYPESCRIPT', 'API-REST', 'FIREBASE', 'OPENAI', 'RESPONSIVE DESIGN', 'ACCESSIBILITY', ],
      liveUrl: 'https://triptailor-ai.vercel.app/',
      githubUrl: 'https://github.com/papercri/triptailor'
    },
    {
      id: 'e-commerce',
      title: 'Fem Shop',
      imageUrl: '/fem-shop.jpg',
      description: 'FemShop is a modern e-commerce application built with Vue, focused on delivering a smooth and intuitive shopping experience. It includes product listing, cart management, and user authentication, with a scalable architecture that separates state, persistence, and data handling. The project combines local and cloud-based solutions to ensure both performance and reliability.',
      highlights: [
        'State management with Pinia, enabling a clean and scalable structure for cart, products, and user sessions.',
        'Hybrid data handling using Firebase for authentication and database management, combined with localStorage for client-side persistence.',
        'Integration with an external API for user management, demonstrating experience working with third-party services and asynchronous data flows.',
      ],
      tags: ['VUE', 'PINIA','FIREBASE','JAVASCRIPT', 'API-REST', 'TAILWIND', 'RESPONSIVE DESIGN', 'ACCESSIBILITY'],
      liveUrl: 'https://femshop.vercel.app/',
      githubUrl: 'https://github.com/papercri/femshop'
    },
    {
      id: 'prompt-composer',
      title: 'Prompt Composer',
      imageUrl: '/prompt-composer.jpg',
      description: 'Prompt Composer is an online prompt building tool. Users can create, organise and save prompt templates in folders. It supports cloud storage of prompts once you sign in with an account. The interface is simple and aimed at helping people keep prompt text organised and reusable.',
      highlights: [
        'Cloud-based prompt saving and folder organisation to manage prompt templates over time.',
        'Simple login with Google for access and storage of user prompts.',
        'Focus on reusable prompt management to speed up prompt writing and iteration.',
      ],
      tags: ['NEXT', 'TAILWIND', 'TYPESCRIPT',  'FIREBASE', 'GOOGLE AUTH', ],
      liveUrl: 'https://prompt-composer-ai.vercel.app/',
      githubUrl: 'https://github.com/papercri/prompt-composer'
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-8 border-t border-foreground/10 flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <motion.div
          className="sticky top-20 z-30 bg-background/10 py-5 flex flex-wrap items-center gap-4 md:gap-6 backdrop-blur-sm"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease }}
        ><span className="inline-block w-2 h-2 rounded-full bg-foreground/50" />
          <span className="text-xs font-semibold tracking-widest uppercase text-foreground/50">
            SELECTED WORK
          </span>
          <div className="flex flex-wrap items-center gap-3 md:gap-5 text-sm font-semibold text-foreground">
            {projects.map((project) => (
              <a key={project.id} href={`#${project.id}`} className="hover:opacity-60 transition-opacity">
                {project.title}
              </a>
            ))}
          </div>
        
        </motion.div>

        <div className="space-y-0 mt-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              id={project.id}
              className="group min-h-[100svh] flex items-start py-4 scroll-mt-44 border-foreground/10 last:border-b last:border-foreground/10"
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP2}
              transition={{ duration: 0.9, delay: index * 0.1, ease }}
            >
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">{project.title}</h3>
                  <p className="text-foreground/65 leading-relaxed max-w-3xl">{project.description}</p>

                  <ul className="space-y-2">
                    {project.highlights.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-foreground/60 leading-relaxed">
                        <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 border border-foreground/15 text-[11px] font-semibold tracking-widest text-foreground/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-5">
                    <a href={project.liveUrl} className="flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-60 transition-opacity" target='blank'>
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                    <a href={project.githubUrl} className="flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-60 transition-opacity" target='blank'>
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                  </div>
                </div>

                <div className="w-full  min-h-[320px] max-h-[500px] border border-foreground/15 overflow-hidden bg-foreground/[0.03]">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full "
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
