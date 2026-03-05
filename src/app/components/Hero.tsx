import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollingText } from './ScrollingText';
import { useI18n } from '../i18n';
import { ease } from '../lib/animation';

export function Hero() {
  const { t } = useI18n();

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="w-full md:min-h-[100svh] min-h-[100vh] md:h-[100svh] md:overflow-hidden flex flex-col pt-8 px-8 relative overflow-x-hidden items-bottom pb-10 md:pb-0 "
    >
      <div className="flex w-full justify-between flex-wrap md:flex-nowrap max-w-7xl mx-auto ">
        <div className="w-full flex flex-col justify-start mx-auto relative md:flex-[2_2_0%] min-w-0 items-end">
        <div className="w-full flex flex-col justify-start sm:py-5 py-2">
          <motion.div
            className="section-label-row md:mb-12 mb-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="section-label-dot bg-foreground/30"></span>
            <p className="section-label-text text-foreground/80">
              {t.hero.eyebrow}
            </p>
          </motion.div>

          <div className="md:mb-10 mb-4">
            <motion.h1
              id="hero-title"
              className="text-[clamp(3.5rem,9vw,7rem)] leading-none font-extrabold tracking-normal text-foreground"
              aria-label="Cristiana Sollini"
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2, ease }}
              >
                Cristiana
              </motion.span>
              <motion.span
                className="block text-foreground/50"
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.1, ease }}
              >
                Sollini
              </motion.span>
            </motion.h1>
          </div>
          <div className="relative z-10 flex flex-wrap items-end gap-8 w-full 2xl:flex-nowrap 2xl:gap-24 justify-start">
            <motion.p
              className="text-lg text-foreground/80 max-w-lg leading-relaxed font-light"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.32, ease }}
            >
              {t.hero.bio}
            </motion.p>

            <motion.div
              className="flex items-center gap-6 "
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.44, ease }}
            >
              
              <a
                href="https://www.linkedin.com/in/cristianasollini/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="mailto:cristiana.sollini@gmail.com"
                className="text-foreground/50 hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" aria-hidden="true" /></a>
                <a
                href="https://github.com/papercri"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/50 hover:text-foreground transition-colors "
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" aria-hidden="true" /> 
              </a>
            
            </motion.div>
          </div>
        </div>

        </div>
        <div className="w-full md:max-w-none md:flex-1 mx-auto flex-shrink-0 relative z-10 md:justify-end items-end  flex max-w-3/5 justify-center">
          <motion.img
            src="/cris-hero.png"
            alt="Cristiana Sollini front-end developer"
            className="img-hover w-full h-auto object-fill profile-img"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: .7, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
          />
        </div>
      </div>
      

      <div className="z-10 md:flex-1 md:min-h-0 md:overflow-hidden md:[container-type:size] md:flex hidden">
        <ScrollingText />
      </div>
    </section>
  );
}
