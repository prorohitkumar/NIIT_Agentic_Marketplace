'use client';

import type { Agent } from '@/lib/utils/data';
import { Flame, Sparkles, Star, ShieldCheck } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  meta: {
    category: string;
    badge: 'Trending' | 'Just Released' | 'Popular' | 'Stable';
    icon: string;
    gradient: string;
  };
}

export function AgentCard({ agent, meta }: AgentCardProps) {
  const badgeIcon =
    meta.badge === 'Trending'
      ? Flame
      : meta.badge === 'Just Released'
        ? Sparkles
        : meta.badge === 'Popular'
          ? Star
          : ShieldCheck;

  return (
    <div className="glass rounded-lg transition-all duration-300 hover:bg-card/80 p-6 h-full flex flex-col group hover:shadow-lg hover:shadow-black/10">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-3 flex-1">
          <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${meta.gradient} border border-border`}>
            <span className="text-xl">{meta.icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground">{agent.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{meta.category}</p>
          </div>
        </div>
        <span
          className={
            meta.badge === 'Trending'
              ? 'px-2 py-1 text-xs font-medium rounded border bg-primary/15 text-primary border-primary/30'
              : meta.badge === 'Just Released'
                ? 'px-2 py-1 text-xs font-medium rounded border bg-emerald-500/15 text-emerald-600 border-emerald-500/30'
                : meta.badge === 'Popular'
                  ? 'px-2 py-1 text-xs font-medium rounded border bg-amber-500/15 text-amber-700 border-amber-500/30'
                  : 'px-2 py-1 text-xs font-medium rounded border bg-muted/50 text-muted-foreground border-border'
          }
        >
          <span className="inline-flex items-center gap-1">
            {(() => {
              const Icon = badgeIcon;
              return <Icon className="h-3.5 w-3.5" />;
            })()}
            {meta.badge}
          </span>
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 flex-1">{agent.description}</p>
    </div>
  );
}
