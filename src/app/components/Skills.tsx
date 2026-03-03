import { motion } from 'motion/react';
import { useI18n } from '../i18n';
import { ease, VP, VP2 } from '../lib/animation';

export function Skills() {
  const { t } = useI18n();
  const skillCategories = t.skills.categories;

  return (
    <section id="skills" aria-labelledby="skills-title" className="section-base pb-30 bg-foreground text-background">
      <div className="section-container">
        {/* Section label */}
        <motion.div
          className="section-label-row mb-8"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease }}
        >
          <span className="section-label-dot bg-background/30" aria-hidden="true" />
          <span className="section-label-text text-background/50">
            {t.skills.label}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          id="skills-title"
          className="text-5xl md:text-6xl font-extrabold tracking-wide text-background leading-none mb-10"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 1, ease, delay: 0.08 }}
        >
          {t.skills.title}
        </motion.h2>

        {/* Categories */}
        <div className="space-y-0">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="py-6 border-t border-white/10 flex flex-col md:flex-row md:items-start gap-8"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP2}
              transition={{ duration: 0.85, delay: categoryIndex * 0.12, ease }}
            >
              <h3 className="text-sm font-semibold tracking-widest uppercase text-background/50 w-40 shrink-0 mt-1">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const offset = (categoryIndex * 0.5 + skillIndex * 0.3) % 4;
                  return (
                    <motion.div
                      key={skillIndex}
                      className="relative p-[1px] overflow-hidden "
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={VP2}
                      transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.04, ease }}
                    >
                  
                      <div className="absolute inset-0 bg-background/20" />
            
                      <motion.div
                        className="absolute w-[200%] h-[200%] -top-[50%] -left-[50%]"
                        style={{
                          background:
                            'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,1) 30deg, rgba(255,255,255,.5) 65deg, transparent 110deg)',
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
                      <span className="relative block px-4 py-2 bg-foreground text-background/85 text-sm font-medium hover:text-background transition-colors">
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
