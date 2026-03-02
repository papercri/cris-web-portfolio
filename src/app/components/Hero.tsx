import { Github, Linkedin, Mail, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollingText } from './ScrollingText';

const E = [0.25, 0.46, 0.45, 0.94] as const;

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="w-full min-h-[100svh] flex flex-col pt-20 px-8 relative overflow-x-hidden ">
      <div className="w-full flex-1 flex flex-col justify-center max-w-7xl mx-auto relative profile-photo  border-b border-black/10 z-20">
        {/* Main hero content — grows to fill available space */}
        <div className="w-full flex-1 flex flex-col justify-start py-5">
          {/* Eyebrow label */}
          <motion.div
            className="flex items-center gap-3 mb-12 "
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: E }}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-foreground/30"></span>
            <span className="text-xs font-semibold tracking-widest uppercase text-foreground/50">
              BASED IN BARCELONA, SPAIN &nbsp;·&nbsp; FRONT END DEVELOPER
            </span>
          </motion.div>

          {/* Display headline */}
          <div className="mb-10 ">
            <motion.h1
              className="text-[clamp(3.2rem,7.8vw,6.8rem)] leading-none font-extrabold tracking-normal text-foreground"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: E }}
            >
              Cristiana Sollini
            </motion.h1>
            <motion.h1
              className="text-[clamp(3rem,7vw,6rem)] leading-none font-extrabold tracking-normal text-foreground/25"
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: E }}
            >
              My Portfolio
            </motion.h1>
            
          </div>

          {/* Bottom row: bio + links */}
          <div className="relative z-10 flex flex-wrap items-end gap-8 w-full 2xl:flex-nowrap 2xl:gap-24 justify-start">
            <motion.p
              className="text-lg text-foreground/60 max-w-md leading-relaxed"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.32, ease: E }}
            >
              I build digital experiences that are fast, accessible, and visually clear. Over the years, I&apos;ve focused on creating interfaces that not only look good, but feel intuitive and consistent across devices.
            </motion.p>

            <motion.div
              className="flex items-center gap-6 "
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.44, ease: E }}
            >
              <a
                href="https://github.com/papercri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/cristianasollini/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:cristiana.sollini@gmail.com"
                className="text-foreground/50 hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <button
                onClick={scrollToProjects}
                className="ml-4 px-6 py-3 bg-foreground text-background text-sm font-semibold tracking-wide hover:opacity-80 transition-opacity"
              >
                VIEW WORK
              </button>
            </motion.div>
          </div>
        </div>

      </div>

      <div className="absolute inset-x-0 bottom-0 z-10">
        <ScrollingText />
      </div>
    </section>
  );
}
