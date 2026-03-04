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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);
  /* useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []); */

  useEffect(() => {
    const navbar = document.getElementById('main-navbar');

    if (!isOpen && !isDownloadDialogOpen) {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      if (navbar) navbar.style.paddingRight = '';
      return;
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
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        id="main-navbar"
        aria-label="Primary"
        className={`sticky  top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 bg-background/95 backdrop-blur-sm border-b border-foreground/10  }`}
      >
        <div className="px-8 py-5">
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              className={`inline-flex text-xl font-extrabold tracking-tight uppercase text-foreground hover:opacity-60 ${blurHover}`}
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
                  <motion.a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className={`inline-flex text-xs font-semibold tracking-widest text-foreground/70 hover:text-foreground ${blurHover} link-anim`}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </motion.ul>

            {/* Botones de acción (Tema, CV, Idioma, Menú móvil) */}
            <div className="flex items-center gap-4">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    type="button"
                    className={`inline-flex px-2 py-1 text-xs font-semibold tracking-widest text-foreground/80 rounded-none hover:text-foreground ${buttonBlurHover}`}
                    aria-label={t.nav.language}
                  >
                    {locale.toUpperCase()}
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-20 rounded-none border-foreground/20 bg-background p-0 z-[200]">
                  <DropdownMenuItem onClick={() => setLocale('en')} className={`justify-between rounded-none px-3 py-2 cursor-pointer ${buttonBlurHover}`}>
                    EN {locale === 'en' && <span>✓</span>}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocale('es')} className={`justify-between rounded-none px-3 py-2 cursor-pointer ${buttonBlurHover}`}>
                    ES {locale === 'es' && <span>✓</span>}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <motion.button
                type="button"
                onClick={() => setIsDownloadDialogOpen(true)}
                className={`group relative inline-flex p-2 text-foreground/60 hover:text-foreground ${buttonBlurHover}`}
                aria-label={t.nav.downloadCv}
              >
                <motion.span className="block">
                  <Download className="w-4 h-4" aria-hidden="true" />
                </motion.span>
                <span className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground text-background px-3 py-1.5 text-[10px] font-semibold tracking-widest opacity-0 translate-y-1 transition-[opacity,transform] duration-200 group-hover:opacity-100 group-hover:translate-y-0">
                  {t.nav.downloadCv}
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={toggleDark}
                className={`inline-flex p-2 text-foreground/60 hover:text-foreground ${buttonBlurHover}`}
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
              </motion.button>

              <motion.button
                type="button"
                className={`md:hidden inline-flex p-2 text-foreground hover:opacity-60 ${buttonBlurHover}`}
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls={mobileMenuId}
              >
                {isOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      {isOpen && (
        <div
          id={mobileMenuId}
      
          className="fixed inset-0 z-40 h-[100dvh] pt-20 bg-background/98 backdrop-blur-md md:hidden flex flex-col items-start"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="px-6 pt-8 flex items-center gap-4">
            <motion.button
              type="button"
              onClick={() => setLocale('en')}
              className={`inline-flex  py-1 text-sm font-semibold tracking-widest ${buttonBlurHover} ${locale === 'en' ? 'text-foreground' : 'text-foreground/50 hover:text-foreground/80'}`}
              aria-label="Switch to English"
            >
              EN
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setLocale('es')}
              className={`inline-flex px-2 py-1 text-sm font-semibold tracking-widest ${buttonBlurHover} ${locale === 'es' ? 'text-foreground' : 'text-foreground/50 hover:text-foreground/80'}`}
              aria-label="Cambiar a español"
            >
              ES
            </motion.button>
          </div>
          <ul className="flex flex-col px-6 pt-4 space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <motion.a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className={`inline-flex text-xl font-extrabold tracking-tight text-foreground leading-none ${buttonBlurHover}`}
                >
                  {item.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal de descarga de CV */}
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
                className={`px-4 py-2 text-sm font-medium border border-foreground/20 text-foreground hover:bg-foreground/5 ${buttonBlurHover}`}
              >
                {t.nav.cancel}
              </button>
              <button
                type="button"
                onClick={handleDownloadCv}
                className={`px-4 py-2 text-sm font-medium bg-foreground text-background hover:opacity-90 ${buttonBlurHover}`}
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