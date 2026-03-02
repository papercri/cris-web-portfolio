import { motion } from 'motion/react';

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const VP = { once: false, margin: '-80px' };
const VP2 = { once: false, margin: '-40px' };

export function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['HTML & CSS', 'LESS', 'SASS', 'Tailwind', 'Bootstrap']
    },
    {
      category: 'JS & Frameworks',
      skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js', 'REST APIs']
    },
    {
      category: 'Backend & CMS',
      skills: ['PHP', 'MySQL', 'WordPress', 'Contentful']
    },
    {
      category: 'Tools & Workflow',
      skills: ['Git', 'Docker',  'Figma', 'Jest', ' Accessibility (WCAG)', 'Responsive Design','SEO']
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-32 px-8 bg-[#1A1A1A] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-3 mb-16"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-white/30" />
          <span className="text-xs font-semibold tracking-widest uppercase text-white/40">
            SKILLS & EXPERTISE
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-10"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 1, ease, delay: 0.08 }}
        >
          What I work with<br />every day.
        </motion.h2>

        {/* Categories */}
        <div className="space-y-0">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="py-10 border-t border-white/10 flex flex-col md:flex-row md:items-start gap-8"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP2}
              transition={{ duration: 0.85, delay: categoryIndex * 0.12, ease }}
            >
              <h3 className="text-sm font-semibold tracking-widest uppercase text-white/40 w-40 shrink-0 mt-1">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => {
                  const offset = (categoryIndex * 0.5 + skillIndex * 0.3) % 4;
                  return (
                    <motion.div
                      key={skillIndex}
                      className="relative p-[1px] overflow-hidden"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={VP2}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.04, ease }}
                    >
                      {/* Base track — always visible */}
                      <div className="absolute inset-0 bg-white/18" />
                      {/* Rotating color sweep */}
                      <motion.div
                        className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%]"
                        style={{
                          background:
                            'conic-gradient(from 0deg, transparent 0deg, rgba(139,92,246,1) 30deg, rgba(99,202,183,1) 65deg, transparent 110deg)',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: offset,
                        }}
                      />
                      {/* Content */}
                      <span className="relative block px-4 py-2 bg-[#1A1A1A] text-white/80 text-sm font-medium hover:text-white transition-colors">
                        {skill}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
