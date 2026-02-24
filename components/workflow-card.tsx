'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Workflow } from '@/lib/utils/data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface WorkflowCardProps {
  workflow: Workflow;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="glass rounded-lg transition-all duration-300 hover:bg-card/80 p-6 h-full flex flex-col cursor-pointer group"
      >
        {/* Architecture preview */}
        <div className="relative mb-4 h-44 -m-6 mb-0 rounded-t-lg overflow-hidden border-b border-border">
          <Image
            src={workflow.architectureImage}
            alt={workflow.name}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/15 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 pb-0 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-base font-semibold text-foreground leading-snug">{workflow.name}</h3>
            <span className="shrink-0 inline-flex items-center px-2 py-1 text-xs font-medium bg-muted/50 text-muted-foreground rounded border border-border">
              {workflow.department}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-4">{workflow.problemStatement}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {workflow.techStack.slice(0, 4).map(t => (
              <span key={t} className="inline-block px-2 py-1 text-xs bg-muted/50 text-muted-foreground rounded border border-border">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-2">
            <button className="w-full mt-2 px-3 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm rounded-lg transition-colors duration-200">
              View Workflow
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="flex flex-col gap-1">
              <span className="text-foreground">{workflow.name}</span>
              <span className="text-sm text-muted-foreground font-normal">{workflow.department}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Architecture */}
            <div className="relative h-72 rounded-lg overflow-hidden border border-border">
              <Image
                src={workflow.architectureImage}
                alt={workflow.name}
                fill
                className="object-contain bg-muted/40"
              />
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Problem statement</p>
              <p className="text-foreground">{workflow.problemStatement}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Overview</p>
              <p className="text-foreground/90 whitespace-pre-line">{workflow.overview}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-2">Tech stack</p>
              <div className="flex flex-wrap gap-2">
                {workflow.techStack.map(t => (
                  <span key={t} className="px-3 py-1 bg-muted/50 text-foreground rounded border border-border text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
