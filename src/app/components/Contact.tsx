import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';
import { ease, VP, VP2 } from '../lib/animation';
import ContactForm from './ContactForm';

export function Contact() {
  const { t } = useI18n();
  const contactTitleLines = t.contact.title.split('\n');

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="inverted-section section-base pb-32 bg-foreground text-background overflow-x-hidden"
    >
      <div className="section-container min-h-[70vh] min-w-0 flex flex-col">

        {/* Section label */}
        <motion.div
          className="section-label-row lg:mb-16 mb-4"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease }}
        >
          <span className="section-label-dot bg-background/30" aria-hidden="true" />
          <span className="section-label-text text-background/50">
            {t.contact.label}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 w-full">

          <div className="flex flex-col">
            <motion.h2
              id="contact-title"
              className="h2 text-5xl md:text-8xl font-extrabold tracking-tight text-background leading-[0.95] md:mb-10 mb-4 [text-wrap:balance]"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 1, ease, delay: 0.05 }}
            >
              {contactTitleLines.map((line, index) => (
                <span key={index}>
                  {line}
                  {index < contactTitleLines.length - 1 ? <br /> : null}
                </span>
              ))}
            </motion.h2>

            <motion.p
              className="text-background/65 text-base lg:text-lg leading-relaxed mb-auto lg:max-w-xs max-w-none"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP2}
              transition={{ duration: 0.85, ease, delay: 0.18 }}
            >
              {t.contact.text}
            </motion.p>

            <motion.div
              className="hidden md:flex items-center gap-5 lg:mt-14 pt-8 lg:border-t border-background/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP2}
              transition={{ duration: 0.7, ease, delay: 0.32 }}
            >
              <a
                href="mailto:cristiana.sollini@gmail.com"
                aria-label="Email"
                className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-background/15 text-background/50 overflow-hidden hover:border-background/50 transition-colors duration-300 focus-ring-inv"
              >
                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-background translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.19,1,0.22,1)' }} />
                <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/cristianasollini/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-background/15 text-background/50 overflow-hidden hover:border-background/50 transition-colors duration-300 focus-ring-inv"
              >
                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-background translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.19,1,0.22,1)' }} />
                <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </span>
              </a>
              <a
                href="https://github.com/papercri"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-background/15 text-background/50 overflow-hidden hover:border-background/50 transition-colors duration-300 focus-ring-inv"
              >
                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-background translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.19,1,0.22,1)' }} />
                <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">
                  <Github className="w-5 h-5" aria-hidden="true" />
                </span>
              </a>
            </motion.div>
          </div>

          <ContactForm />
          <motion.div
              className="flex md:hidden items-center gap-5 lg:mt-14 pt-8 lg:border-t border-background/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VP2}
              transition={{ duration: 0.7, ease, delay: 0.32 }}
            >
              <a
                href="mailto:cristiana.sollini@gmail.com"
                aria-label="Email"
                className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-background/15 text-background/50 overflow-hidden hover:border-background/50 transition-colors duration-300 focus-ring-inv"
              >
                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-background translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.19,1,0.22,1)' }} />
                <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/cristianasollini/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-background/15 text-background/50 overflow-hidden hover:border-background/50 transition-colors duration-300 focus-ring-inv"
              >
                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-background translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.19,1,0.22,1)' }} />
                <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </span>
              </a>
              <a
                href="https://github.com/papercri"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-background/15 text-background/50 overflow-hidden hover:border-background/50 transition-colors duration-300 focus-ring-inv"
              >
                <span aria-hidden="true" className="absolute inset-0 rounded-full bg-background translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.19,1,0.22,1)' }} />
                <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">
                  <Github className="w-5 h-5" aria-hidden="true" />
                </span>
              </a>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
