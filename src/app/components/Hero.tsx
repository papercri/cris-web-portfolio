import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollingText } from './ScrollingText';
import { useI18n } from '../i18n';

const E = [0.25, 0.46, 0.45, 0.94] as const;

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="w-full min-h-[100svh] lg:h-[100svh] lg:overflow-hidden flex flex-col pt-16 px-8 relative overflow-x-hidden items-bottom"
    >
      <div className="flex w-full justify-between flex-wrap lg:flex-nowrap max-w-7xl mx-auto ">
        <div className="w-full flex flex-col justify-start mx-auto relative lg:flex-[2_2_0%] min-w-0 items-end">
        <div className="w-full flex flex-col justify-start py-5">
          <motion.div
            className="flex items-center gap-3 mb-12 "
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: E }}
          >
            <span className="inline-block w-2 h-2 rounded-full bg-foreground/30"></span>
            <p className="text-xs font-semibold tracking-widest uppercase text-foreground/60">
              {t.hero.eyebrow}
            </p>
          </motion.div>

          <div className="mb-10 ">
            <motion.h1
              id="hero-title"
              className="text-[clamp(3.5rem,9vw,8rem)] leading-none font-extrabold tracking-normal text-foreground"
              aria-label="Cristiana Sollini"
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: E }}
              >
                Cristiana
              </motion.span>
              <motion.span
                className="block text-foreground/50"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: E }}
              >
                Sollini
              </motion.span>
            </motion.h1>
          </div>
          <div className="relative z-10 flex flex-wrap items-end gap-8 w-full 2xl:flex-nowrap 2xl:gap-24 justify-start">
            <motion.p
              className="text-lg text-foreground/60 max-w-md leading-relaxed font-light"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.32, ease: E }}
            >
              {t.hero.bio}
            </motion.p>

            <motion.div
              className="flex items-center gap-6 "
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.44, ease: E }}
            >
              
              <a
                href="https://www.linkedin.com/in/cristianasollini/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="mailto:cristiana.sollini@gmail.com"
                className="text-foreground/50 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" aria-hidden="true" /></a>
                <a
                href="https://github.com/papercri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" aria-hidden="true" /> 
              </a>
            
              <a
                href="#projects"
                className="ml-4 px-6 py-3 bg-foreground text-background text-sm font-semibold tracking-wide hover:opacity-80 transition-opacity"
              >
                VIEW WORK
              </a> 
            </motion.div>
          </div>
        </div>

        </div>
        <div className="w-full lg:max-w-none lg:flex-1 mx-auto flex-shrink-0 relative z-10 lg:justify-end items-end  flex max-w-2/5 justify-center">
          <motion.img
            src="/cris-hero.png"
            alt="Cristiana Sollini front-end developer"
            className="w-full h-auto object-fill"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: E }}
          />
        </div>
      </div>
      

      <div className="z-10 lg:flex-1 lg:min-h-0 lg:overflow-hidden lg:[container-type:size]">
        <ScrollingText />
      </div>
    </section>
  );
}
