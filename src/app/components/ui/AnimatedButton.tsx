import { motion } from 'motion/react';
import { ease } from '../../lib/animation';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
  'aria-busy'?: boolean;
  /**
   * 'dark'  — bg-foreground / text-background, hover fills bg-background  (light sections)
   * 'light' — bg-white / text-[#1A1A1A],         hover fills bg-[#1A1A1A] (inverted/dark sections)
   */
  variant?: 'dark' | 'light';
  className?: string;
}

export function AnimatedButton({
  children,
  onClick,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
  'aria-busy': ariaBusy,
  variant = 'dark',
  className = '',
}: AnimatedButtonProps) {
  const isDark = variant === 'dark';

  const base =
    'relative overflow-hidden group ' +
    'inline-flex items-center gap-2 px-6 py-3 ' +
    'text-xs font-bold tracking-[0.15em] uppercase border ' +
    'disabled:opacity-40 disabled:cursor-not-allowed ';

  const colors = isDark
    ? 'bg-foreground text-background border-foreground'
    : 'bg-white text-[#1A1A1A] border-white';

  const fillColor = isDark ? 'bg-background' : 'bg-[#1A1A1A]';
  const hoverTextColor = isDark ? 'group-hover:text-foreground' : 'group-hover:text-white';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-busy={ariaBusy}
      className={`${base}${colors} ${className}`}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ duration: 0.18, ease }}
    >
      {/* Sliding fill overlay */}
      <span
        className={`absolute inset-0 z-0 ${fillColor} translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]`}
      />

      {/* Content */}
      <span className={`relative z-10 inline-flex items-center gap-2 transition-colors duration-500 ${hoverTextColor}`}>
        {children}
      </span>
    </motion.button>
  );
}
