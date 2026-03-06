import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';
import { ease, VP, VP2 } from '../lib/animation';

export function Projects() {
  const { t } = useI18n();
  const projects = t.projects.items;


  return (
    <section id="projects" aria-labelledby="projects-title" className="section-base pb-20 border-t border-foreground/10">
      <div className="section-container">
        <h2 id="projects-title" className="sr-only">{t.nav.projects}</h2>
        <motion.div
          className="sm:sticky sm:top-18 sm:z-30 bg-background/95 sm:py-5 flex flex-wrap items-center gap-4 md:gap-6 "
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease }}
        >
          <span className="section-label-dot bg-foreground/50" aria-hidden="true" />
          <span className="section-label-text text-foreground/50">
            {t.projects.label}
          </span>
          <nav aria-label="Projects section links" className="sm:flex hidden flex-wrap items-center gap-3 md:gap-5 text-sm font-semibold text-foreground">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => document.getElementById(project.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                className="hover:opacity-60 transition-opacity focus-ring link-anim cursor-pointer"
              >
                {project.title}
              </button>
            ))}
          </nav>
        
        </motion.div>

        <div className="space-y-0 sm:mt-10 ">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              id={project.id}
              className="group min-h-[100svh] flex items-start py-8 scroll-mt-40 border-t border-foreground/10 sm:border-t-0 first:border-t-0 "
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP2}
              transition={{ duration: 0.9, delay: index * 0.1, ease }}
            >
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="h3 text-3xl md:text-4xl font-bold text-foreground leading-tight">{project.title}</h3>
                  <p className="text-foreground/65 leading-relaxed max-w-3xl">{project.description}</p>

                  <ul className="space-y-2">
                    {project.highlights.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-foreground/80 leading-relaxed">
                        <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-foreground/40 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center gap-3">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                      className="tag-badge"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-5">
                    <a
                      href={project.liveUrl}
                      className="flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-60 transition-opacity focus-ring link-anim"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      {t.projects.liveDemo}
                    </a>
                    <a
                      href={project.githubUrl}
                      className="flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-60 transition-opacity focus-ring link-anim"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4" aria-hidden="true" />
                      {t.projects.code}
                    </a>
                  </div>
                </div>

                <div className="w-full  min-h-[320px] max-h-[480px] border border-foreground/15 overflow-hidden bg-foreground/[0.03] mobile-img">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="img-hover w-full h-full object-cover mobile-img"
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
