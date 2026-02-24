'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { Check, Copy } from 'lucide-react';
import type { Prompt } from '@/lib/types/prompt';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface PromptCardProps {
  prompt: Prompt;
}

export function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current != null) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  async function copyTestPrompt(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    const text = prompt.testPrompt?.trim();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement('textarea');
      el.value = text;
      el.style.position = 'fixed';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }

    setCopied(true);
    if (copyTimeoutRef.current != null) window.clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="glass w-full text-left rounded-lg transition-all duration-300 hover:bg-card/80 p-6 flex flex-col justify-between h-full"
          aria-label={`Open details for ${prompt.name}`}
        >
          {/* Top Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-4 flex-1">
                <span className="text-2xl leading-none">{prompt.icon}</span>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    {prompt.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {prompt.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
  {/* Category */}
  <span className="inline-block px-2 py-1 text-xs font-medium bg-muted/70 text-foreground rounded border border-border">
    {prompt.category.charAt(0).toUpperCase() + prompt.category.slice(1).toLowerCase()}
  </span>

  {/* Cleaned Tags */}
  {Array.from(
    new Map(
      prompt.tags
        .filter(
          tag => tag.toLowerCase() !== prompt.category.toLowerCase()
        )
        .map(tag => [tag.toLowerCase(), tag])
    ).values()
  )
  .slice(0, 2)
  .map(tag => (
    <span
      key={tag}
      className="inline-block px-2 py-1 text-xs text-muted-foreground bg-muted/50 rounded border border-border"
    >
      {tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()}
    </span>
  ))}
</div>
      
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-2xl leading-none">{prompt.icon}</span>
            <span>{prompt.name}</span>
          </DialogTitle>
          <DialogDescription>{prompt.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-5 text-sm text-foreground/90">
          {prompt.testPrompt.trim() ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  Test prompt
                </h4>
                <button
                  type="button"
                  onClick={copyTestPrompt}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-md border border-border bg-muted/40 hover:bg-muted/60 transition-colors"
                  aria-label="Copy test prompt to clipboard"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="whitespace-pre-wrap break-words rounded-md border border-border bg-muted/30 p-3 text-xs leading-relaxed">
                {prompt.testPrompt}
              </pre>
            </div>
          ) : null}

          {prompt.dataRequirement.trim() ? (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Data requirement
              </h4>
              <div className="whitespace-pre-wrap break-words rounded-md border border-border bg-muted/20 p-3 text-sm leading-relaxed">
                {prompt.dataRequirement}
              </div>
            </div>
          ) : null}

          {prompt.sourceOutputs.trim() ? (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Source outputs
              </h4>
              <div className="whitespace-pre-wrap break-words rounded-md border border-border bg-muted/20 p-3 text-sm leading-relaxed">
                {prompt.sourceOutputs}
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}