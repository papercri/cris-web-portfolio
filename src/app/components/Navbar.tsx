import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';
import { motion } from 'motion/react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
  };

  const navItems = [
    { label: 'HOME', href: '#home' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-background/95 backdrop-blur-sm border-b border-foreground/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="text-sm font-semibold tracking-widest uppercase text-foreground hover:opacity-60 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              CS.
            </motion.a>

            {/* Desktop Navigation */}
            <motion.ul
              className="hidden md:flex items-center gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className="text-xs font-semibold tracking-widest text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </motion.ul>

            {/* Dark mode + Mobile menu */}
            <div className="flex items-center gap-4">
              <a
                href="/CV-EN-min-Cristiana-Sollini.pdf"
                download
                className="group relative p-2 text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Download CV"
              >
                <Download className="w-4 h-4" />
                <span className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground text-background px-3 py-1.5 text-[10px] font-semibold tracking-widest opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                  DOWNLOAD CV
                </span>
              </a>
              <button
                onClick={toggleDark}
                className="p-2 text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button
                className="md:hidden p-2 text-foreground hover:opacity-60 transition-opacity"
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer — outside nav so it's never clipped */}
      {isOpen && (
        <div className="fixed inset-0 z-40 pt-20 bg-background/98 backdrop-blur-md md:hidden flex flex-col">
          <ul className="flex flex-col px-10 pt-10 space-y-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="text-4xl font-extrabold tracking-tight text-foreground hover:opacity-50 transition-opacity"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
