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
    <section id="contact" className="min-h-screen py-32 px-8 bg-[#1A1A1A] flex flex-col justify-center">
      <div className="w-full max-w-7xl mx-auto min-h-[70vh] flex flex-col">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.8, ease }}
        >
          <span className="inline-block w-2 h-2 rounded-full bg-white/30" />
          <span className="text-xs font-semibold tracking-widest uppercase text-white/40">
            {t.contact.label}
          </span>
        </motion.div>

        <motion.h2
          className="text-[clamp(6rem,18vw,20rem)] font-extrabold tracking-tighter lg:leading-[12rem] text-white mb-12"
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
          className="text-white/55 text-lg max-w-2xl leading-relaxed mb-10"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP2}
          transition={{ duration: 0.8, ease, delay: 0.12 }}
        >
          {t.contact.text} <a
            href="mailto:cristiana.sollini@gmail.com"
            className="text-white/55 hover:text-white transition-colors underline underline-offset-4"
            aria-label="Email"
          >
            {t.contact.email}
          </a> or <a
            href="https://www.linkedin.com/in/cristianasollini/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 hover:text-white transition-colors underline underline-offset-4"
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
            className="text-white/55 hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail className="w-8 h-8" />
          </a>

          <a
            href="https://www.linkedin.com/in/cristianasollini/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-8 h-8" />
          </a>

          <a
            href="https://github.com/papercri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/55 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-8 h-8" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
