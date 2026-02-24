'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Prompt } from '@/lib/types/prompt';

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="glass rounded-lg transition-all duration-300 hover:bg-card/80 p-6 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-4 flex-1">
          <span className="text-2xl">{prompt.icon}</span>
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground mb-1">{prompt.name}</h3>
            <p className="text-sm text-muted-foreground">{prompt.description}</p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 mt-1 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-block px-2 py-1 text-xs font-medium bg-muted/70 text-foreground rounded border border-border">
          {prompt.category}
        </span>
        {prompt.tags.slice(0, 2).map(tag => (
          <span key={tag} className="inline-block px-2 py-1 text-xs text-muted-foreground bg-muted/50 rounded border border-border">
            {tag}
          </span>
        ))}
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-border/60 space-y-3 text-sm text-foreground/90">
          <p>{prompt.detailedDescription}</p>
          <button className="w-full mt-4 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors duration-200">
            View Details
          </button>
        </div>
      )}
    </div>
  );
}
