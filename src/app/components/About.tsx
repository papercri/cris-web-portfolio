import { motion } from 'motion/react';

const E = [0.25, 0.46, 0.45, 0.94] as const;
const VP = { once: false, margin: '-80px' };

export function About() {
  const highlights = [
    {
      number: '01',
      title: 'Mobile First',
      description: 'Designing and developing responsive, mobile-first interfaces that feel fast, clear, and easy to use on any screen.'
    },
    {
      number: '02',
      title: 'Accessibility Focus',
      description: 'Creating accessible interfaces with semantic HTML, clear structure, and strong attention to WCAG standards.'
    },
    {
      number: '03',
      title: 'Performance & SEO',
      description: 'Optimizing speed, structure, and semantic markup to improve performance, search visibility, and overall user experience.'
    },
    {
      number: '04',
      title: 'Clean Code',
      description: 'Writing maintainable, scalable code following best practices and proven patterns.'
    }
  ];

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
            ABOUT ME
          </span>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left: headline + bio — slide in from left */}
          <div>
            <motion.h2
              className="text-5xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-2"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 1, ease: E, delay: 0.05 }}
            >
              Turning ideas<br />into reality.
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
              My background is rooted in HTML and CSS, where structure, detail, and accessibility matter. I work comfortably with React and modern front-end tools, and I’m used to collaborating closely with design and backend teams to turn complex ideas into solid, maintainable code.
            </motion.p>
            <motion.p
              className="text-lg text-foreground/60 leading-relaxed mb-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.85, ease: E, delay: 0.35 }}
            >
              Performance and usability are not afterthoughts in my work — they are part of the foundation. I pay attention to clean components, scalable structures, and layouts that behave as expected in the real world.
            </motion.p>
            <motion.p
              className="text-lg text-foreground/60 leading-relaxed "
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.85, ease: E, delay: 0.45 }}
            >
            I’m also exploring AI-assisted development to streamline workflows and build smarter interfaces when it makes sense.
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
