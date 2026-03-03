import { Linkedin, Mail, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const VP = { once: false, margin: '-80px' };
const VP2 = { once: false, margin: '-40px' };

export function Contact() {
  const { t } = useI18n();
  const contactTitleLines = t.contact.title.split('\n');
  return (
    <section id="contact" aria-labelledby="contact-title" className="min-h-screen pt-14 pb-32 px-8 bg-foreground text-background flex flex-col justify-center overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto min-h-[70vh] min-w-0 flex flex-col">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-background/30" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-widest uppercase text-background/50">
            {t.contact.label}
          </span>
        </motion.div>

        <motion.h2
          id="contact-title"
          className="w-full max-w-full min-w-0 text-[clamp(2.75rem,11vw,10rem)] font-extrabold tracking-tight leading-[0.88] sm:leading-[0.9] md:leading-[0.92] text-background mb-6 break-words [text-wrap:balance]"
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
          className="w-full max-w-2xl min-w-0 text-background/70 text-[clamp(1rem,1.4vw,1.125rem)] leading-[clamp(1.5rem,2.6vw,1.9rem)] break-words mb-10"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP2}
          transition={{ duration: 0.8, ease, delay: 0.12 }}
        >
          {t.contact.text} <a
            href="mailto:cristiana.sollini@gmail.com"
            className="text-background/80 hover:text-background transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/80 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            aria-label="Email"
          >
            {t.contact.email}
          </a> or <a
            href="https://www.linkedin.com/in/cristianasollini/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-background/80 hover:text-background transition-colors underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/80 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            aria-label="LinkedIn"
          >
            {t.contact.linkedin}
          </a>{t.contact.ending}
        </motion.p>

        <motion.div
          className="mt-auto self-end flex items-center gap-6"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP2}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <a
            href="mailto:cristiana.sollini@gmail.com"
            className="text-background/70 hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/80 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            aria-label="Email"
          >
            <Mail className="w-8 h-8" aria-hidden="true" />
          </a>

          <a
            href="https://www.linkedin.com/in/cristianasollini/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-background/70 hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/80 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-8 h-8" aria-hidden="true" />
          </a>

          <a
            href="https://github.com/papercri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-background/70 hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/80 focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            aria-label="GitHub"
          >
            <Github className="w-8 h-8" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
