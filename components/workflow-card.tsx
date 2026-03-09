'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import type { Workflow } from '@/lib/utils/data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ZoomIn, ZoomOut, RotateCcw, Download } from 'lucide-react';

interface WorkflowCardProps {
  workflow: Workflow;
}

export function WorkflowCard({ workflow }: WorkflowCardProps) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isPanning, setIsPanning] = useState(false);
  const [panStartX, setPanStartX] = useState(0);
  const [panStartY, setPanStartY] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 1));
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(1, Math.min(prev + delta, 3)));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoom > 1) {
      setIsPanning(true);
      setPanStartX(e.clientX - panX);
      setPanStartY(e.clientY - panY);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPanning && zoom > 1) {
      setPanX(e.clientX - panStartX);
      setPanY(e.clientY - panStartY);
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

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
            {/* Architecture with Zoom Controls */}
            <div className="space-y-2">
              {/* Zoom Controls */}
              <div className="flex gap-2 items-center">
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 1}
                  className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Zoom Out (Scroll down)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm text-muted-foreground min-w-[50px] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Zoom In (Scroll up)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="w-px h-6 bg-border" />
                <button
                  onClick={handleResetZoom}
                  disabled={zoom === 1 && panX === 0 && panY === 0}
                  className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Image Container */}
              <div
                ref={imageContainerRef}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="relative h-72 rounded-lg overflow-hidden border border-border bg-muted/40 cursor-grab active:cursor-grabbing"
              >
                <div
                  style={{
                    transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                    transformOrigin: 'center',
                    transition: isPanning ? 'none' : 'transform 0.2s ease-out',
                  }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={workflow.architectureImage}
                    alt={workflow.name}
                    fill
                    className="object-contain"
                    draggable={false}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Use mouse wheel to zoom, drag to pan
              </p>
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

            {/* Deploy this Workflow Section */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-base font-semibold text-foreground mb-3">Deploy this Workflow</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Download the n8n template and import it into your n8n instance to start using this workflow.
              </p>
              
              {/* Download Button */}
              <button
                onClick={() => window.open(`/api/workflows/${workflow.id}`, '_blank')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors duration-200 mb-6"
              >
                <Download className="w-4 h-4" />
                Download n8n Template
              </button>

              {/* How to Use Guide */}
              <div className="bg-muted/30 rounded-lg p-4 border border-border">
                <h4 className="font-semibold text-foreground mb-3">How to Use This Workflow</h4>
                <ol className="space-y-2 text-sm text-foreground/90">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">1</span>
                    <span>Download the JSON template using the button above.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">2</span>
                    <span>Open your n8n instance.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">3</span>
                    <span>Click <strong>Workflows → Import from File</strong>.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">4</span>
                    <span>Upload the downloaded JSON file.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">5</span>
                    <span>Configure credentials for integrations (Google Sheets, APIs, etc.).</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">6</span>
                    <span>Update any nodes that require your own data sources.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-semibold">7</span>
                    <span>Activate the workflow.</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
