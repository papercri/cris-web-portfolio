import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const VP = { once: false, margin: '-80px' };
const VP2 = { once: false, margin: '-40px' };

export function Projects() {
  const projects = [
    {
      title: 'E-Commerce Platform',
      year: '2024',
      description: 'A full-featured e-commerce platform with cart management, payment integration, and admin dashboard. Built with React, Node.js, and Stripe.',
      image: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlfGVufDF8fHx8MTc3MjM0NTcyM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Task Management App',
      year: '2023',
      description: 'Collaborative task management application with real-time updates, team features, and analytics dashboard. Inspired by modern productivity tools.',
      image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NzI0MjYxODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'WebSocket'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Social Media Dashboard',
      year: '2023',
      description: 'Analytics dashboard for social media managers to track engagement, schedule posts, and monitor performance across multiple platforms.',
      image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzcyNDAwMTY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tags: ['React', 'GraphQL', 'Tailwind', 'Charts'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-32 px-8 border-t border-foreground/10 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-3 mb-16"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-foreground/30" />
          <span className="text-xs font-semibold tracking-widest uppercase text-foreground/50">
            SELECTED WORK
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight mb-20"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 1, ease, delay: 0.08 }}
        >
          Featured projects.
        </motion.h2>

        {/* Project list */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group py-10 border-t border-foreground/10 last:border-b last:border-foreground/10"
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP2}
              transition={{ duration: 0.9, delay: index * 0.1, ease }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                {/* Image thumbnail — from left */}
                <motion.div
                  className="w-full lg:w-64 h-44 overflow-hidden shrink-0 bg-[#E8E5E0]"
                  initial={{ opacity: 0, x: -40, scale: 1.04 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={VP2}
                  transition={{ duration: 1, delay: index * 0.1 + 0.1, ease }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </motion.div>

                {/* Content — from right */}
                <motion.div
                  className="flex-1 flex flex-col justify-between gap-6"
                  initial={{ opacity: 0, x: 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={VP2}
                  transition={{ duration: 0.9, delay: index * 0.1 + 0.15, ease }}
                >
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-xs font-semibold tracking-widest text-foreground/40">{project.year}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:opacity-70 transition-opacity">
                      {project.title}
                    </h3>
                    <p className="text-foreground/55 leading-relaxed max-w-2xl">{project.description}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex flex-wrap gap-2 flex-1">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 border border-foreground/15 text-xs font-semibold tracking-wide text-foreground/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-5 shrink-0">
                      <a href={project.liveUrl} className="flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-60 transition-opacity">
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                      <a href={project.githubUrl} className="flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-60 transition-opacity">
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
