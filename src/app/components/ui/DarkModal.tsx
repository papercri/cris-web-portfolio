import { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { ease } from '../../lib/animation';

interface DarkModalProps {
  open: boolean;
  onClose: () => void;
  titleId: string;
  icon: React.ReactNode;
  iconBorderClass?: string;
  title: string;
  description?: string;
  closeLabel: string;
  children: React.ReactNode;
}

export function DarkModal({
  open,
  onClose,
  titleId,
  icon,
  iconBorderClass = 'border-white/15',
  title,
  description,
  closeLabel,
  children,
}: DarkModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 bg-[#111] border border-white/10 p-10 max-w-sm w-full text-center"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.3, ease }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* X close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/25 hover:text-white/70 transition-colors"
              aria-label={closeLabel}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon circle */}
            <div className={`mx-auto mb-7 w-14 h-14 rounded-full border ${iconBorderClass} flex items-center justify-center`}>
              {icon}
            </div>

            {/* Title */}
            <h3 id={titleId} className="text-white text-xl font-extrabold tracking-tight mb-3">
              {title}
            </h3>

            {/* Description */}
            {description && (
              <p className="text-white/45 text-sm leading-relaxed mb-8">
                {description}
              </p>
            )}

            {/* Actions */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
