import { useI18n } from '../i18n';
import { useReducedMotion } from 'motion/react';

export function ScrollingText() {
  const { t } = useI18n();
  const items = t.scrolling.items;
  const shouldReduceMotion = useReducedMotion();

  const line = items.map((item, i) =>
    item === '. '
      ? <span key={i} className="mx-5 opacity-10 font-bold">. </span>
      : <span key={i} className="mx-5 opacity-10 font-bold">{item}</span>
  );

  return (
    <>
      {!shouldReduceMotion && <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 200s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>}
      <div className="w-full overflow-hidden bg-transparent select-none">
        <div className={`${shouldReduceMotion ? 'flex flex-wrap justify-center' : 'marquee-track'} text-foreground text-[90vh] lg:text-[140cqh] font-extrabold tracking-wide items-center leading-[70%] uppercase`}>
          <span className="flex items-center gap-0 pr-16">{line}</span>
          {!shouldReduceMotion && <span className="flex items-center gap-0 pr-16">{line}</span>}
          {!shouldReduceMotion && <span className="flex items-center gap-0 pr-16" aria-hidden>{line}</span>}
          {!shouldReduceMotion && <span className="flex items-center gap-0 pr-16" aria-hidden>{line}</span>}
        </div>
      </div>
    </>
  );
}
