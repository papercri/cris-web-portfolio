import { motion } from 'motion/react';
import { useI18n } from '../i18n';
import { ease, VP } from '../lib/animation';

export function About() {
  const { t } = useI18n();
  const highlights = t.about.highlights;

  return (
    <section id="about" className="section-base pb-10">
      <div className="section-container">
 
        <motion.div
          className="section-label-row mb-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease }}
        >
          <span className="section-label-dot bg-foreground/30" />
          <span className="section-label-text text-foreground/50">
            {t.about.label}
          </span>
        </motion.div>

 
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <motion.h2
              className="text-5xl md:text-6xl font-extrabold tracking-wide text-foreground leading-none mb-2"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 1, ease, delay: 0.05 }}
            >
              {t.about.title.split('\n')[0]}<br />{t.about.title.split('\n')[1]}
            </motion.h2>

            <motion.div
              className="h-px bg-foreground/20 mb-8"
              initial={{ scaleX: 0, originX: '0%' }}
              whileInView={{ scaleX: 1 }}
              viewport={VP}
              transition={{ duration: 0.8, ease, delay: 0.2 }}
            />

            <motion.p
              className="text-lg text-foreground/60 leading-relaxed mb-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.85, ease, delay: 0.25 }}
            >
              {t.about.p1}
            </motion.p>
            <motion.p
              className="text-lg text-foreground/60 leading-relaxed mb-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.85, ease, delay: 0.35 }}
            >
              {t.about.p2}
            </motion.p>
            <motion.p
              className="text-lg text-foreground/60 leading-relaxed mb-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.85, ease, delay: 0.45 }}
            >
              {t.about.p3}
            </motion.p>
            <motion.p
              className="text-lg text-foreground/60 leading-relaxed"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.85, ease, delay: 0.55 }}
            >
              {t.about.p4}
            </motion.p>
          </div>

          <div className="space-y-0">
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-8 py-6 border-b border-foreground/10 last:border-b-0"
                initial={{ opacity: 0, x: 70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VP}
                transition={{ duration: 0.85, ease, delay: 0.1 + index * 0.1 }}
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
