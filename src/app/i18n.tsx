import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'en' | 'es';

type I18nValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (typeof translations)[Locale];
};

const I18nContext = createContext<I18nValue | null>(null);

const STORAGE_KEY = 'portfolio-locale';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'es') {
      setLocaleState(stored);
      return;
    }

    const browserLocale = (window.navigator.languages?.[0] || window.navigator.language).toLowerCase();
    const detected: Locale = browserLocale.startsWith('es') ? 'es' : 'en';
    setLocaleState(detected);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale;
    document.title = translations[locale].seo.title;

    const description = translations[locale].seo.description;
    const ensureMetaByName = (name: string, value: string) => {
      let element = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    const ensureMetaByProperty = (property: string, value: string) => {
      let element = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    ensureMetaByName('description', description);
    ensureMetaByProperty('og:title', translations[locale].seo.title);
    ensureMetaByProperty('og:description', description);
    ensureMetaByProperty('og:locale', locale === 'es' ? 'es_ES' : 'en_US');
  }, [locale]);

  const value = useMemo<I18nValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: translations[locale],
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
}

export const translations = {
  en: {
    seo: {
      title: 'Cristiana Sollini | Front-End Developer Portfolio',
      description: 'Front-end developer portfolio focused on accessible, performant, and SEO-friendly web experiences built with React and modern tooling.',
    },
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      skills: 'SKILLS',
      projects: 'PROJECTS',
      contact: 'CONTACT',
      downloadCv: 'DOWNLOAD CV',
      modalTitle: 'Do you want to download my CV?',
      modalDesc: 'This will download the PDF CV to your device.',
      cancel: 'Cancel',
      download: 'Download CV',
      language: 'Language',
      english: 'English',
      spanish: 'Spanish',
    },
    hero: {
      eyebrow: 'FRONT END DEVELOPER · BASED IN BARCELONA, SPAIN',
      bio: 'I build digital experiences that are fast, accessible, and visually clear. Over the years, I’ve focused on creating interfaces that not only look good, but feel intuitive and consistent across devices.',
    },
    scrolling: {
      items: ['FrontEnd Developer', '/ ', 'UX/UI & Web Accessibility', '/ ', 'React', '/ ', 'Next.js', '/ ', 'Vue.js', '/ ', 'HTML & CSS', '/ '],
    },
    about: {
      label: 'ABOUT ME',
      title: 'Turning ideas\ninto reality.',
      p1: 'My background is rooted in HTML and CSS, where structure, detail, and accessibility matter. I work comfortably with React and modern front-end tools, and I’m used to collaborating closely with design and backend teams to turn complex ideas into solid, maintainable code.',
      p2: 'Performance and usability are not afterthoughts in my work — they are part of the foundation. I pay attention to clean components, scalable structures, and layouts that behave as expected in the real world.',
      p3: 'I’m also exploring AI-assisted development to streamline workflows and build smarter interfaces when it makes sense.',
      p4: 'I strengthened my technical foundation through a Front-End Bootcamp focused on React at IT Academy. Before that, I completed a Vue.js Bootcamp at CodeOp and a PHP & MySQL course to better understand backend logic and data flow. I also hold a Bachelor’s Degree in Communication Sciences, which shapes the way I approach UX, clarity, and visual structure.',
      
      highlights: [
        {
          number: '01',
          title: 'Mobile First',
          description: 'Designing and developing responsive, mobile-first interfaces that feel fast, clear, and easy to use on any screen.',
        },
        {
          number: '02',
          title: 'Accessibility Focus',
          description: 'Creating accessible interfaces with semantic HTML, clear structure, and strong attention to WCAG standards.',
        },
        {
          number: '03',
          title: 'Performance & SEO',
          description: 'Optimizing speed, structure, and semantic markup to improve performance, search visibility, and overall user experience.',
        },
        {
          number: '04',
          title: 'Clean Code',
          description: 'Writing maintainable, scalable code following best practices and proven patterns.',
        },
        {
          number: '05',
          title: 'Collaboration & UX/UI Focus',
          description: 'I work closely with design and backend teams to translate mockups into accurate, consistent, and functional interfaces. I bring a strong UX mindset, pay attention to visual detail, and keep the end user in mind in every technical decision.',
        },
        
      ],
    },
    skills: {
      label: 'SKILLS & EXPERTISE',
      title: 'What I work with every day.',
      categories: [
        { category: 'Frontend', skills: ['HTML & CSS', 'LESS', 'SASS', 'Tailwind', 'Bootstrap'] },
        { category: 'JS & Frameworks', skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js'] },
        { category: 'Backend & CMS', skills: ['PHP', 'MySQL', 'WordPress', 'Contentful', 'Firebase', 'REST APIs'] },
        { category: 'Tools & Workflow', skills: ['Git', 'Docker', 'Figma', 'Jest', 'Accessibility (WCAG)', 'Responsive Design', 'SEO'] },
      ],
    },
    projects: {
      label: 'SELECTED WORK',
      liveDemo: 'Live Demo',
      code: 'Code',
      items: [
        {
          id: 'travel-planner',
          title: 'Trip Taylor',
          imageUrl: '/trip-tailor.jpg',
          description:
            'AI-powered travel planner web app that helps users discover destinations and get personalized travel recommendations. Built with modern technologies, it allows users to explore cities, view key information, and plan their trips through an interactive assistant.',
          highlights: [
            'Generates personalized itineraries using dynamic OpenAI prompts, adapting recommendations to user preferences, budget, and travel style.',
            'Built with Next.js, TypeScript, Tailwind, and Firebase, including authentication and full CRUD functionality so users can save, edit, and manage their trips.',
            'Optimized data architecture with multiple travel APIs combined into a single request, reducing load times and improving performance and user experience.',
          ],
          tags: ['NEXT', 'TAILWIND', 'TYPESCRIPT', 'API-REST', 'FIREBASE', 'OPENAI', 'RESPONSIVE DESIGN', 'ACCESSIBILITY'],
          liveUrl: 'https://triptailor-ai.vercel.app/',
          githubUrl: 'https://github.com/papercri/triptailor',
        },
        {
          id: 'e-commerce',
          title: 'Fem Shop',
          imageUrl: '/fem-shop.jpg',
          description:
            'FemShop is a modern e-commerce application built with Vue, focused on delivering a smooth and intuitive shopping experience. It includes product listing, cart management, and user authentication, with a scalable architecture that separates state, persistence, and data handling. The project combines local and cloud-based solutions to ensure both performance and reliability.',
          highlights: [
            'State management with Pinia, enabling a clean and scalable structure for cart, products, and user sessions.',
            'Hybrid data handling using Firebase for authentication and database management, combined with localStorage for client-side persistence.',
            'Integration with an external API for user management, demonstrating experience working with third-party services and asynchronous data flows.',
          ],
          tags: ['VUE', 'PINIA', 'FIREBASE', 'JAVASCRIPT', 'API-REST', 'TAILWIND', 'RESPONSIVE DESIGN', 'ACCESSIBILITY'],
          liveUrl: 'https://femshop.vercel.app/',
          githubUrl: 'https://github.com/papercri/femshop',
        },
        {
          id: 'prompt-composer',
          title: 'Prompt Composer',
          imageUrl: '/prompt-composer.jpg',
          description:
            'Prompt Composer is an online prompt building tool. Users can create, organise and save prompt templates in folders. It supports cloud storage of prompts once you sign in with an account. The interface is simple and aimed at helping people keep prompt text organised and reusable.',
          highlights: [
            'Cloud-based prompt saving and folder organisation to manage prompt templates over time.',
            'Simple login with Google for access and storage of user prompts.',
            'Focus on reusable prompt management to speed up prompt writing and iteration.',
          ],
          tags: ['NEXT', 'TAILWIND', 'TYPESCRIPT', 'FIREBASE', 'GOOGLE AUTH'],
          liveUrl: 'https://prompt-composer-ai.vercel.app/',
          githubUrl: 'https://github.com/papercri/prompt-composer',
        },
      ],
    },
    contact: {
      label: 'CONTACT',
      title: 'let’s\nconnect',
      text: 'If you want to collaborate, discuss a project, or just say hi, reach me directly by',
      email: 'Email',
      linkedin: 'LinkedIn',
      ending: '.',
    },
    footer: {
      rights: 'All rights reserved.',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
  },
  es: {
    seo: {
      title: 'Cristiana Sollini | Portfolio Front-End Developer',
      description: 'Portfolio de desarrollo front-end centrado en accesibilidad, rendimiento y buenas prácticas SEO con React y herramientas modernas.',
    },
    nav: {
      home: 'INICIO',
      about: 'SOBRE MÍ',
      skills: 'SKILLS',
      projects: 'PROYECTOS',
      contact: 'CONTACTO',
      downloadCv: 'DESCARGAR CV',
      modalTitle: '¿Quieres descargar mi CV?',
      modalDesc: 'Esto descargará el CV en PDF en tu dispositivo.',
      cancel: 'Cancelar',
      download: 'Descargar CV',
      language: 'Idioma',
      english: 'Inglés',
      spanish: 'Español',
    },
    hero: {
      eyebrow: 'FRONT END DEVELOPER · BARCELONA, ESPAÑA ',
      bio: 'Construyo experiencias digitales rápidas, accesibles y visualmente claras. Durante los últimos años me he enfocado en crear interfaces que no solo se vean bien, sino que también resulten intuitivas y consistentes en cualquier dispositivo.',
    },
    scrolling: {
      items: ['Desarrollo FrontEnd', '/ ', 'UX & UI', '/ ', 'Accesibilidad Web', '/ ', 'React', '/ ', 'Next.js', '. ', 'Vue.js', '/ ', 'HTML & CSS', '/ '],
    },
    about: {
      label: 'SOBRE MÍ',
      title: 'Convirtiendo ideas\nen realidad.',
      p1: 'Mi base está en HTML y CSS, donde la estructura, el detalle y la accesibilidad son clave. Trabajo con soltura con React y herramientas front-end modernas, y colaboro de forma cercana con equipos de diseño y backend para convertir ideas complejas en código sólido y mantenible.',
      p2: 'El rendimiento y la usabilidad no son algo secundario en mi trabajo: son parte de la base. Cuido componentes limpios, estructuras escalables y layouts que se comporten como deben en el mundo real.',
      p3: 'También estoy explorando desarrollo asistido por IA para agilizar flujos de trabajo y construir interfaces más inteligentes cuando tiene sentido.',
      p4: 'He reforzado mi base técnica con un Bootcamp de Front-End centrado en React en IT Academy. Antes cursé un Bootcamp de Vue.js en CodeOp y una formación en PHP y MySQL para comprender mejor la lógica de backend y el flujo de datos. Además, soy licenciada en Ciencias de la Comunicación, una formación que influye en mi forma de entender la experiencia de usuario, la claridad y la estructura visual.',
      highlights: [
        {
          number: '01',
          title: 'Mobile First',
          description: 'Diseño y desarrollo interfaces responsive, mobile-first, rápidas, claras y fáciles de usar en cualquier pantalla.',
        },
        {
          number: '02',
          title: 'Accesibilidad',
          description: 'Creo interfaces accesibles con HTML semántico, estructura clara y atención real a los estándares WCAG.',
        },
        {
          number: '03',
          title: 'Rendimiento y SEO',
          description: 'Optimizo velocidad, estructura y semántica para mejorar rendimiento, visibilidad en buscadores y experiencia de usuario.',
        },
        {
          number: '04',
          title: 'Código Limpio',
          description: 'Escribo código mantenible y escalable siguiendo buenas prácticas y patrones probados.',
        },
        {
          number: '05',
          title: 'Colaboración y visión UX/UI',
          description: 'I work closely with design and backend teams to translate mockups into accurate, consistent, and functional interfaces. I bring a strong UX mindset, pay attention to visual detail, and keep the end user in mind in every technical decision.',
        },
      ],
    },
    skills: {
      label: 'SKILLS & EXPERTISE',
      title: 'Con lo que trabajo cada día.',
      categories: [
        { category: 'Frontend', skills: ['HTML y CSS', 'LESS', 'SASS', 'Tailwind', 'Bootstrap'] },
        { category: 'JS y Frameworks', skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Vue.js'] },
        { category: 'Backend y CMS', skills: ['PHP', 'MySQL', 'WordPress', 'Contentful', 'Firebase', 'REST APIs'] },
        { category: 'Herramientas y Flujo', skills: ['Git', 'Docker', 'Figma', 'Jest', 'Accesibilidad (WCAG)', 'Diseño Responsive', 'SEO'] },
      ],
    },
    projects: {
      label: 'PROYECTOS DESTACADOS',
      liveDemo: 'Demo',
      code: 'Código',
      items: [
        {
          id: 'travel-planner',
          title: 'Trip Taylor',
          imageUrl: '/trip-tailor.jpg',
          description:
            'Aplicación web de planificación de viajes con IA que ayuda a descubrir destinos y obtener recomendaciones personalizadas. Permite explorar ciudades, ver información clave y planificar viajes mediante un asistente interactivo.',
          highlights: [
            'Genera itinerarios personalizados con prompts dinámicos de OpenAI según preferencias, presupuesto y estilo de viaje.',
            'Construida con Next.js, TypeScript, Tailwind y Firebase, incluyendo autenticación y CRUD completo para guardar y gestionar viajes.',
            'Arquitectura de datos optimizada combinando varias APIs de viaje en una única petición para mejorar rendimiento y tiempos de carga.',
          ],
          tags: ['NEXT', 'TAILWIND', 'TYPESCRIPT', 'API-REST', 'FIREBASE', 'OPENAI', 'RESPONSIVE DESIGN', 'ACCESSIBILITY'],
          liveUrl: 'https://triptailor-ai.vercel.app/',
          githubUrl: 'https://github.com/papercri/triptailor',
        },
        {
          id: 'e-commerce',
          title: 'Fem Shop',
          imageUrl: '/fem-shop.jpg',
          description:
            'Aplicación de e-commerce construida con Vue, centrada en una experiencia de compra fluida e intuitiva. Incluye catálogo, carrito y autenticación de usuarios, con una arquitectura escalable para estado, persistencia y datos.',
          highlights: [
            'Gestión de estado con Pinia para una estructura limpia y escalable de carrito, productos y sesión.',
            'Manejo híbrido de datos con Firebase y localStorage para rendimiento y fiabilidad.',
            'Integración con API externa para gestión de usuarios y flujos asíncronos.',
          ],
          tags: ['VUE', 'PINIA', 'FIREBASE', 'JAVASCRIPT', 'API-REST', 'TAILWIND', 'RESPONSIVE DESIGN', 'ACCESSIBILITY'],
          liveUrl: 'https://femshop.vercel.app/',
          githubUrl: 'https://github.com/papercri/femshop',
        },
        {
          id: 'prompt-composer',
          title: 'Prompt Composer',
          imageUrl: '/prompt-composer.jpg',
          description:
            'Herramienta online para crear y organizar prompts. Los usuarios pueden guardar plantillas en carpetas y almacenarlas en la nube al iniciar sesión.',
          highlights: [
            'Guardado en la nube y organización por carpetas para gestionar plantillas de prompts.',
            'Inicio de sesión con Google para acceso y almacenamiento de contenido.',
            'Enfoque en reutilización para acelerar la creación e iteración de prompts.',
          ],
          tags: ['NEXT', 'TAILWIND', 'TYPESCRIPT', 'FIREBASE', 'GOOGLE AUTH'],
          liveUrl: 'https://prompt-composer-ai.vercel.app/',
          githubUrl: 'https://github.com/papercri/prompt-composer',
        },
      ],
    },
    contact: {
      label: 'CONTACTO',
      title: 'conectemos',
      text: 'Si quieres colaborar, hablar de un proyecto o simplemente saludar, escríbeme directamente por',
      email: 'Email',
      linkedin: 'LinkedIn',
      ending: '.',
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      email: 'Email',
    },
  },
};
