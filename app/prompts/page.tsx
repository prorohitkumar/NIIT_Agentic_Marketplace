'use client';

import { useEffect, useMemo, useState } from 'react';
import { Navbar } from '@/components/navbar';
import { PromptCard } from '@/components/prompt-card';
import { Search } from 'lucide-react';
import type { Prompt } from '@/lib/types/prompt';

export default function PromptsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setLoadError(null);
        const res = await fetch('/api/prompts');
        if (!res.ok) {
          throw new Error(`Failed to load prompts (${res.status})`);
        }
        const data = (await res.json()) as { prompts?: Prompt[]; error?: string; message?: string };
        if (cancelled) return;
        setPrompts(Array.isArray(data.prompts) ? data.prompts : []);
      } catch (e) {
        if (cancelled) return;
        setLoadError(e instanceof Error ? e.message : 'Failed to load prompts');
        setPrompts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(prompts.map(p => p.category))).filter(Boolean).sort();
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    let filtered = prompts;

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    return filtered;
  }, [prompts, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">AI Prompts</h1>
        <p className="text-muted-foreground">Explore pre-designed prompts for your enterprise workflows</p>
      </section>

      {/* Filters Section */}
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 mb-12">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search prompts by name, description, or tags..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card/70 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
          >
            All Prompts
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Prompts Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="glass rounded-lg p-6 animate-pulse"
              >
                <div className="h-5 w-2/3 bg-muted rounded mb-3" />
                <div className="h-4 w-full bg-muted rounded mb-2" />
                <div className="h-4 w-5/6 bg-muted rounded mb-6" />
                <div className="h-7 w-40 bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : loadError ? (
          <div className="glass p-12 rounded-lg text-center">
            <p className="text-foreground text-lg font-medium mb-2">Couldn’t load prompts</p>
            <p className="text-muted-foreground">{loadError}</p>
          </div>
        ) : filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        ) : (
          <div className="glass p-12 rounded-lg text-center">
            <p className="text-muted-foreground text-lg">No prompts found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="mt-4 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
