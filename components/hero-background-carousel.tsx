'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type Slide = { src: string; alt: string };

export function HeroBackgroundCarousel({ className }: { className?: string }) {
  const slides: Slide[] = useMemo(
    () => [
      { src: '/6.jpeg', alt: 'AI analytics' },
      { src: '/7.jpeg', alt: 'AI collaboration' },
      { src: '/8.png', alt: 'AI globe network' },
      { src: '/9.jpeg', alt: 'AI assistant' },
      { src: '/10.jpeg', alt: 'AI generate' },
      { src: '/11.jpeg', alt: 'AI future' },
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive(i => (i + 1) % slides.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div className={cn('pointer-events-none absolute inset-0 z-0 overflow-hidden', className)} aria-hidden="true">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className={cn(
            'absolute inset-0 transition-[opacity,transform] duration-1000 ease-out will-change-transform',
            i === active ? 'opacity-100 scale-[1.02]' : 'opacity-0 scale-100'
          )}
        >
          <Image src={s.src} alt={s.alt} fill priority={i === 0} className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),transparent_35%,rgba(0,0,0,0.6))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,75,178,0.42),transparent_55%),radial-gradient(circle_at_85%_30%,rgba(14,165,233,0.28),transparent_50%),radial-gradient(circle_at_70%_85%,rgba(236,72,153,0.18),transparent_55%)] mix-blend-screen opacity-90" />
        </div>
      ))}

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((s, i) => (
          <span
            key={s.src}
            className={cn(
              'h-2 rounded-full transition-all duration-300 border border-white/30 bg-white/30 hover:bg-white/55',
              i === active ? 'w-8 bg-white' : 'w-2'
            )}
          />
        ))}
      </div>
    </div>
  );
}

