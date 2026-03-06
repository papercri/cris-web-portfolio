/** Standard easing curve [x1, y1, x2, y2] */
export const ease = [0.25, 0.46, 0.45, 0.94] as const;

/** Viewport config for section headings / primary elements */
export const VP = { once: false, margin: '-80px' } as const;

/** Viewport config for list items / secondary elements */
export const VP2 = { once: false, margin: '-40px' } as const;

/** Blur-hover effect for nav links */
export const blurHover = 'transition-all duration-500 ease-in-out hover:opacity-70 hover:filter hover:blur-[0.5px] focus-ring';

/** Blur-hover effect for icon buttons */
export const buttonBlurHover = 'inline-flex items-center justify-center w-9 h-9 rounded-full opacity-50 hover:opacity-100 hover:bg-foreground/[0.07] hover:backdrop-blur-sm hover:drop-shadow-[0_0_12px_rgba(100,100,100,0.2)] transition-all duration-300 ease-out focus-ring';
