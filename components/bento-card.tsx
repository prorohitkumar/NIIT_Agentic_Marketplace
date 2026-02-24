'use client';

interface BentoCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
  gradient?: string;
  ctaLabel?: string;
  ctaDisabled?: boolean;
}

export function BentoCard({
  icon,
  title,
  description,
  className = 'col-span-1 row-span-1',
  gradient = 'from-primary/20 to-purple-500/20',
  ctaLabel = 'Learn More →',
  ctaDisabled = false,
}: BentoCardProps) {
  return (
    <div
      className={`glass rounded-lg transition-all duration-300 hover:bg-card/80 p-6 flex flex-col justify-between h-full cursor-pointer group ${className}`}
    >
      <div>
        <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-2xl">{icon}</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <button
        type="button"
        disabled={ctaDisabled}
        className={`mt-4 px-3 py-2 border border-border rounded-lg text-sm transition-all duration-200 ${
          ctaDisabled
            ? 'bg-muted/40 text-muted-foreground/80 cursor-not-allowed'
            : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground'
        }`}
      >
        {ctaLabel}
      </button>
    </div>
  );
}
