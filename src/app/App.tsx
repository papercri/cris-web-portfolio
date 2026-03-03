import { lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CustomCursor } from './components/CustomCursor';

// Lazy-load below-the-fold sections so the browser renders the hero first
const About    = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Skills   = lazy(() => import('./components/Skills').then(m => ({ default: m.Skills })));
const Projects = lazy(() => import('./components/Projects').then(m => ({ default: m.Projects })));
const Contact  = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const Footer   = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to main content
      </a>
      <CustomCursor />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </Suspense>
      </main>
    </div>
  );
}