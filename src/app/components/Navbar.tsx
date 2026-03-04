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
  
  if (element) {
    const navbarHeight = document.getElementById('main-navbar')?.offsetHeight || 0;
    // Calculamos la posición del elemento menos la altura del nav + los 3px de margen
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - (navbarHeight - 3);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};


  return (
    <>
      {/* 1. NAVBAR FIJO: z-[100] asegura que siempre esté arriba de todo */}
      <nav
        id="main-navbar"
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 bg-background/95 backdrop-blur-md border-b border-foreground/10"
      >
        <div className="px-6 py-5 md:px-8"> {/* Reduje un poco el padding en móvil */}
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
                  <a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className={`text-xs font-semibold tracking-widest text-foreground/70 hover:text-foreground ${blurHover}`}
                  >
                    {item.label}
                  </a>
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

              {/* Botón CV y Tema (Ocultos o simplificados en móvil si ocupan mucho) */}
              <button onClick={() => setIsDownloadDialogOpen(true)} className={buttonBlurHover}>
                <Download className="w-4 h-4" />
              </button>

              <button onClick={toggleDark} className={buttonBlurHover}>
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* BOTÓN MENÚ MÓVIL: Siempre visible porque el nav tiene z-100 */}
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

      {/* 2. MENÚ MÓVIL: z-[90] para que el nav (X) quede encima */}
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
              <li key={item.href} className="w-full">
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  /* break-words evita que el texto se salga */
                  className={`text-3xl font-black tracking-tighter text-foreground break-words block w-full ${buttonBlurHover}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 3. SPACER: Importante para que el contenido no empiece debajo del nav fixed 
      <div className="h-[70px] md:h-[74px]" /> */}

      {/* 4. DOWNLOAD DIALOG */}
      {isDownloadDialogOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setIsDownloadDialogOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={dialogTitleId}
            aria-describedby={dialogDescId}
            className="mod w-full max-w-md rounded-lg border border-foreground/15 bg-background p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id={dialogTitleId} className="text-lg font-semibold text-foreground">
              {t.nav.modalTitle}
            </h3>
            <p id={dialogDescId} className="mt-2 text-sm text-foreground/60">
              {t.nav.modalDesc}
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-2">
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
