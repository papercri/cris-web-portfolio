import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function CustomCursor() {
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const offsetX = -65; 
  const offsetY = 55; 

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringSpringConfig = { damping: 25, stiffness: 150, mass: 0.6 };
  const ringX = useSpring(mouseX, ringSpringConfig);
  const ringY = useSpring(mouseY, ringSpringConfig);

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
     
      mouseX.set(e.clientX + offsetX);
      mouseY.set(e.clientY + offsetY);
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

  const ringSize = isClicking ? 60 : 36;
  const dotSize = isClicking ? 20 : 10;

  return (
    <>
      {/* Anillo exterior */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-300 bg-transparent border-[1.5px] border-chart-4/90 dark:border-chart-4/90"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%', 
          translateY: '-50%',
        }}
        animate={{ width: ringSize, height: ringSize }}
        transition={{
          width: { type: 'spring', damping: 20, stiffness: 260 },
          height: { type: 'spring', damping: 20, stiffness: 260 },
        }}
      />

      {/* Punto central */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-300 bg-chart-4/70 dark:bg-chart-4/70 blur-[1px]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%', 
          translateY: '-50%',
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{
          width: { type: 'spring', damping: 25, stiffness: 400 },
          height: { type: 'spring', damping: 25, stiffness: 400 },
        }}
      />
    </>
  );
}