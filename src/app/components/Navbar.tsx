import { useState, useEffect, useRef } from 'react';
import { Menu, X, Moon, Sun, Download } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useI18n } from '../i18n';
import { ease } from '../lib/animation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
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
    if (isOpen || isDownloadDialogOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, isDownloadDialogOpen]);

  useEffect(() => {
    if (!isDownloadDialogOpen) return;

    closeDialogButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsDownloadDialogOpen(false);
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
  const blurHover = 'transition-all duration-500 ease-in-out hover:opacity-70 hover:filter hover:blur-[0.5px] focus-ring';

  const buttonBlurHover = 'transition-all duration-700 ease-in-out hover:text-foreground hover:drop-shadow-[0_0_15px_rgba(150,150,150,0.25)] dark:hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.18)] focus-ring';


  const handleNavClick = (href: string) => {
    // Force-clear overflow immediately so it doesn't corrupt position measurements
    document.body.style.overflow = '';
    setIsOpen(false);

    const scrollToTarget = (attempts = 0) => {
      // Query inside the callback so lazy-loaded sections have time to mount
      const element = document.querySelector(href);
      if (!element) {
        // Section not yet in DOM (React.lazy still loading) — retry up to 15× (1.5 s total)
        if (attempts < 15) {
          setTimeout(() => scrollToTarget(attempts + 1), 100);
        }
        return;
      }
      const navbarHeight = document.getElementById('main-navbar')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - (navbarHeight - 3);
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    };

    // 150 ms: enough for the mobile-menu overlay to unmount and layout to stabilise
    setTimeout(() => scrollToTarget(), 150);
  };


  return (
    <>
      <nav
        id="main-navbar"
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-background/95 backdrop-blur-md border-b border-foreground/10"
      >
        <div className="px-6 py-5 md:px-8"> 
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className={`inline-flex text-xl font-extrabold tracking-tight uppercase text-foreground ${blurHover}`}
              aria-label="Back to top"
            >
              CS.
            </motion.a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <li key={item.href}>
                  <motion.a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className={`inline-flex text-xs font-semibold tracking-widest text-foreground/70 hover:text-foreground ${blurHover} link-anim`}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            {/* Botones de acción */}
            <div className="flex items-center gap-6 md:gap-8">
              {/* Dropdown Idioma */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button className={`px-2 py-1 text-xs font-semibold ${buttonBlurHover}`}>
                    {locale.toUpperCase()}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-[110] bg-background min-w-[5rem]">
                  <DropdownMenuItem
                    onClick={() => setLocale('en')}
                    className={`px-4 py-2 text-xs font-semibold cursor-pointer hover:bg-foreground/8 transition-colors ${locale === 'en' ? 'text-foreground' : 'text-foreground/50'}`}
                  >
                    EN
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLocale('es')}
                    className={`px-4 py-2 text-xs font-semibold cursor-pointer hover:bg-foreground/8 transition-colors ${locale === 'es' ? 'text-foreground' : 'text-foreground/50'}`}
                  >
                    ES
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Botón CV */}
              <button onClick={() => setIsDownloadDialogOpen(true)} className={`inline-flex p-2 text-foreground/60 hover:text-foreground ${buttonBlurHover}`} aria-label={t.nav.downloadCv}>
                <Download className="w-4 h-4" aria-hidden="true" />
              </button>

              <button onClick={toggleDark} className={`inline-flex p-2 text-foreground/60 hover:text-foreground ${buttonBlurHover}`} aria-label="Toggle dark mode">
                {isDark ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
              </button>
              <button
                type="button"
                className="md:hidden p-2 text-foreground z-[110]" 
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div
          id={mobileMenuId}
          className="fixed inset-0 z-[90] h-[100dvh] pt-24 bg-background/98 backdrop-blur-xl md:hidden flex flex-col items-start overflow-y-auto"
          role="dialog"
        >
          <div className="px-8 pt-4 flex items-center gap-4 border-b border-foreground/5 w-full pb-4">
             <button onClick={() => setLocale('en')} className={`text-sm font-bold ${locale === 'en' ? 'text-foreground' : 'text-foreground/40'}`}>EN</button>
             <button onClick={() => setLocale('es')} className={`text-sm font-bold ${locale === 'es' ? 'text-foreground' : 'text-foreground/40'}`}>ES</button>
          </div>
          
          <ul className="flex flex-col px-8 pt-8 space-y-6 w-full">
            {navItems.map((item) => (
              <li key={item.href} className="w-full mb-3">
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
        
                  className={`text-xl font-black tracking-tighter text-foreground break-words block w-full ${buttonBlurHover}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}


      {/* DOWNLOAD DIALOG */}
      <AnimatePresence>
        {isDownloadDialogOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsDownloadDialogOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
              aria-describedby={dialogDescId}
              className="relative z-10 bg-[#111] border border-white/10 p-10 max-w-sm w-full text-center"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.3, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsDownloadDialogOpen(false)}
                className="absolute top-4 right-4 text-white/25 hover:text-white/70 transition-colors"
                aria-label={t.nav.cancel}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mx-auto mb-7 w-14 h-14 rounded-full border border-white/15 flex items-center justify-center">
                <Download className="w-6 h-6 text-white/70" aria-hidden="true" />
              </div>

              <h3 id={dialogTitleId} className="text-white text-xl font-extrabold tracking-tight mb-3">
                {t.nav.modalTitle}
              </h3>
              <p id={dialogDescId} className="text-white/45 text-sm leading-relaxed mb-8">
                {t.nav.modalDesc}
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  ref={closeDialogButtonRef}
                  type="button"
                  onClick={() => setIsDownloadDialogOpen(false)}
                  className="px-6 py-3 text-xs font-bold tracking-[0.12em] uppercase border border-white/20 text-white/50 hover:text-white hover:border-white/50 transition-colors"
                >
                  {t.nav.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadCv}
                  autoFocus
                  className="px-6 py-3 bg-white text-[#111] text-xs font-bold tracking-[0.12em] uppercase border border-white hover:bg-[#e5e5e5] transition-colors"
                >
                  {t.nav.download}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
