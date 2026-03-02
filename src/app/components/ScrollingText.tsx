export function ScrollingText() {
  const items = [
    'Front End Developer',
    '. ',
    'React & TypeScript',
    '. ',
    'UI / UX',
    '. ',
    'Open Source',
    '. ',
    'Node.js',
    '. ',
    'Barcelona',
    '. ',
  ];

  const line = items.map((item, i) =>
    item === '. '
      ? <span key={i} className="mx-5 opacity-10 font-bold">. </span>
      : <span key={i} className="mx-5 opacity-5 font-bold">{item}</span>
  );

  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 125s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="bg-background select-none">
        <div className="marquee-track text-foreground text-[clamp(2.8rem,12vw,12rem)] font-extrabold  tracking-wide items-center leading-none uppercase">
          <span className="flex items-center gap-0 pr-16">{line}</span>
          <span className="flex items-center gap-0 pr-16">{line}</span>
          <span className="flex items-center gap-0 pr-16" aria-hidden>{line}</span>
          <span className="flex items-center gap-0 pr-16" aria-hidden>{line}</span>
        </div>
      </div>
    </>
  );
}
