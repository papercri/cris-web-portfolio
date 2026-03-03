import { motion } from 'motion/react';
import { useI18n } from '../i18n';

const E = [0.25, 0.46, 0.45, 0.94] as const;
const VP = { once: false, margin: '-80px' };

export function About() {
  const { t } = useI18n();
  const highlights = t.about.highlights;

  return (
    <section id="about" className="min-h-screen py-25 px-8 border-t border-foreground/10 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease: E }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-foreground/30" />
          <span className="text-xs font-semibold tracking-widest uppercase text-foreground/50">
            {t.about.label}
          </span>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: headline + bio — slide in from left */}
          <div>
            <motion.h2
              className="text-5xl md:text-6xl font-extrabold tracking-wide text-foreground leading-none mb-2"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 1, ease: E, delay: 0.05 }}
            >
              {t.about.title.split('\n')[0]}<br />{t.about.title.split('\n')[1]}
            </motion.h2>

            <motion.div
              className="h-px bg-foreground/20 mb-8"
              initial={{ scaleX: 0, originX: '0%' }}
              whileInView={{ scaleX: 1 }}
              viewport={VP}
              transition={{ duration: 0.8, ease: E, delay: 0.2 }}
            />

            <motion.p
              className="text-lg text-foreground/60 leading-relaxed mb-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.85, ease: E, delay: 0.25 }}
            >
              {t.about.p1}
            </motion.p>
            <motion.p
              className="text-lg text-foreground/60 leading-relaxed mb-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.85, ease: E, delay: 0.35 }}
            >
              {t.about.p2}
            </motion.p>
            <motion.p
              className="text-lg text-foreground/60 leading-relaxed "
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.85, ease: E, delay: 0.45 }}
            >
              {t.about.p3}
            </motion.p>
          </div>

          {/* Right: numbered list — slide in from right */}
          <div className="space-y-0">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-8 py-6 border-b border-foreground/10 last:border-b-0"
                initial={{ opacity: 0, x: 70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP}
                transition={{ duration: 0.85, ease: E, delay: 0.1 + index * 0.1 }}
              >
                <span className="text-xs font-bold tracking-widest text-foreground/25 mt-1 w-8 shrink-0">
                  {item.number}
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-foreground/55 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
