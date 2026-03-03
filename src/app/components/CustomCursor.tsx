import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // 1. Valores de movimiento independientes (sin re-renders de React)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. Físicas suaves para el anillo (más retraso = más elegancia)
  const ringSpringConfig = { damping: 25, stiffness: 150, mass: 0.6 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

  // 3. Físicas rápidas para el punto central (snappy y preciso)
  const dotSpringConfig = { damping: 20, stiffness: 400, mass: 0.2 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    const mediaReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mediaFinePointer = window.matchMedia('(pointer: fine)');
    const shouldShowCursor = !mediaReduceMotion.matches && mediaFinePointer.matches;
    
    setIsVisible(shouldShowCursor);
    if (!shouldShowCursor) return;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  const ringSize = isClicking ? 50 : 36;
  const dotSize = isClicking ? 12 : 8;

  return (
    <>
      {/* Anillo exterior (Lento y elástico) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] bg-transparent border-[1.5px] border-chart-4/60 dark:border-chart-4/60 "
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%', // Centrado perfecto
          translateY: '-50%', // Centrado perfecto
        }}
        animate={{
          width: ringSize,
          height: ringSize,
        }}
        transition={{
          width: { type: 'spring', damping: 20, stiffness: 260 },
          height: { type: 'spring', damping: 20, stiffness: 260 },
        }}
      />

      {/* Punto central (Rápido) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] bg-chart-4/90 dark:bg-chart-4/90 blur-[0.5px]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%', 
          translateY: '-50%', 
        }}
        animate={{
          width: dotSize,
          height: dotSize,
        }}
        transition={{
          width: { type: 'spring', damping: 25, stiffness: 400 },
          height: { type: 'spring', damping: 25, stiffness: 400 },
        }}
      />
    </>
  );
}