import { motion } from 'motion/react';

const E = [0.25, 0.46, 0.45, 0.94] as const;
const VP = { once: false, margin: '-40px' };

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 px-8 border-t border-black/10 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.a
          href="#home"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-xs font-semibold tracking-widest uppercase text-foreground hover:opacity-60 transition-opacity"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: E }}
        >
          CS.
        </motion.a>

        <motion.p
          className="text-xs text-foreground/40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: E, delay: 0.1 }}
        >
          © {currentYear} Cristiana Sollini. All rights reserved.
        </motion.p>

        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VP}
          transition={{ duration: 0.7, ease: E, delay: 0.15 }}
        >
          <a
            href="https://github.com/papercri"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/cristianasollini/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:cristiana.sollini@gmail.com"
            className="text-xs font-semibold tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors"
          >
            Email
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
