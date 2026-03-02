import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const pointerGap = 30;

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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
  }, []);

  const size = isClicking ? 60 : 40;

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-100 bg-transparent border border-black/10 dark:border-white/10 "
      animate={{
        x: mousePosition.x + pointerGap,
        y: mousePosition.y + pointerGap,
        width: size,
        height: size,
      }}
      transition={{
        x: { type: 'spring', damping: 18, stiffness: 180, mass: 0.6 },
        y: { type: 'spring', damping: 18, stiffness: 180, mass: 0.6 },
        width: { type: 'spring', damping: 20, stiffness: 260 },
        height: { type: 'spring', damping: 20, stiffness: 260 },
      }}
    />
  );
}
