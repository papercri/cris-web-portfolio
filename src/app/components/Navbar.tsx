import { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isDownloadDialogOpen, setIsDownloadDialogOpen] = useState(false);
  const mobileMenuId = 'mobile-navigation';
  const dialogTitleId = 'cv-dialog-title';
  const dialogDescId = 'cv-dialog-desc';
  const closeDialogButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleDownloadCv = () => {
    const link = document.createElement('a');
    const cvPath = locale === 'es' ? '/CV-ES-min-Cristiana-Sollini.pdf' : '/CV-EN-min-Cristiana-Sollini.pdf';
    link.href = cvPath;
    link.download = cvPath.split('/').pop() || 'CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsDownloadDialogOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen && !isDownloadDialogOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isDownloadDialogOpen]);

  useEffect(() => {
    if (!isDownloadDialogOpen) {
      return;
    }

    closeDialogButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDownloadDialogOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isDownloadDialogOpen]);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
  };

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        aria-label="Primary"
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${scrolled || isOpen ? 'bg-background/95 backdrop-blur-sm border-b border-foreground/10' : 'bg-transparent'}`}
      >
        <div className="px-8 py-5">
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className="text-xl font-extrabold tracking-tight uppercase text-foreground hover:opacity-60 transition-opacity"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              aria-label="Back to top"
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
                    className="text-xs font-semibold tracking-widest text-foreground/70 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </motion.ul>

            {/* Dark mode + Mobile menu */}
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="px-2 py-1 text-xs font-semibold tracking-widest text-foreground/80 rounded-none hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label={t.nav.language}
                  >
                    {locale.toUpperCase()}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-20 rounded-none border-foreground/20 bg-background p-0">
                  <DropdownMenuItem onClick={() => setLocale('en')} className="justify-between rounded-none px-3 py-2">
                    EN
                    {locale === 'en' ? <span>✓</span> : null}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocale('es')} className="justify-between rounded-none px-3 py-2">
                    ES
                    {locale === 'es' ? <span>✓</span> : null}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                type="button"
                onClick={() => setIsDownloadDialogOpen(true)}
                className="group relative p-2 text-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={t.nav.downloadCv}
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground text-background px-3 py-1.5 text-[10px] font-semibold tracking-widest opacity-0 translate-y-1 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                  {t.nav.downloadCv}
                </span>
              </button>
              <button
                type="button"
                onClick={toggleDark}
                className="p-2 text-foreground/60 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
              </button>
              <button
                type="button"
                className="md:hidden p-2 text-foreground hover:opacity-60 transition-opacity"
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls={mobileMenuId}
              >
                {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer — outside nav so it's never clipped */}
      {isOpen && (
        <div
          id={mobileMenuId}
          className="fixed inset-0 z-40 pt-20 bg-background/98 backdrop-blur-md md:hidden flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="px-10 pt-8 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={`px-2 py-1 text-xs font-semibold tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${locale === 'en' ? 'text-foreground' : 'text-foreground/50 hover:text-foreground/80'}`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale('es')}
              className={`px-2 py-1 text-xs font-semibold tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${locale === 'es' ? 'text-foreground' : 'text-foreground/50 hover:text-foreground/80'}`}
              aria-label="Cambiar a español"
            >
              ES
            </button>
          </div>
          <ul className="flex flex-col px-10 pt-10 space-y-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="text-4xl font-extrabold tracking-tight text-foreground hover:opacity-50 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isDownloadDialogOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            aria-describedby={dialogDescId}
            className="w-full max-w-md rounded-lg border border-foreground/15 bg-background p-6 shadow-lg"
          >
            <h3 id={dialogTitleId} className="text-lg font-semibold text-foreground">{t.nav.modalTitle}</h3>
            <p id={dialogDescId} className="mt-2 text-sm text-foreground/60">{t.nav.modalDesc}</p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                ref={closeDialogButtonRef}
                type="button"
                onClick={() => setIsDownloadDialogOpen(false)}
                className="px-4 py-2 text-sm font-medium border border-foreground/20 text-foreground hover:bg-foreground/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t.nav.cancel}
              </button>
              <button
                type="button"
                onClick={handleDownloadCv}
                className="px-4 py-2 text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t.nav.download}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
