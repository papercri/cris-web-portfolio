import { motion } from 'motion/react';

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const VP = { once: false, margin: '-80px' };
const VP2 = { once: false, margin: '-40px' };

export function Skills() {
  const skillCategories = [
    {
      category: 'Frontend',
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Vue.js', 'HTML & CSS', 'Framer Motion']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'GraphQL', 'REST APIs', 'Redis']
    },
    {
      category: 'Tools & Workflow',
      skills: ['Git', 'Docker', 'AWS', 'Figma', 'Jest', 'CI/CD', 'Linux']
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
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight mb-20"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 1, ease, delay: 0.08 }}
        >
          What I work<br />with every day.
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
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className="px-4 py-2 border border-white/20 text-white/80 text-sm font-medium hover:border-white/60 hover:text-white transition-colors"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={VP2}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.04, ease }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
