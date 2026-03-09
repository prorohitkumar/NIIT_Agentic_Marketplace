'use client';

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/navbar';
import { AgentCard } from '@/components/agent-card';
import { getAgents } from '@/lib/utils/data';
import { Search } from 'lucide-react';

type AgentMeta = {
  category: string;
  badge: 'Trending' | 'Just Released' | 'Popular' | 'Stable';
  icon: string;
  gradient: string;
};

function deriveAgentMeta(name: string, description: string, index: number): AgentMeta {
  const text = `${name} ${description}`.toLowerCase();
  const category =
    /(sales|pitch|lead)/.test(text)
      ? 'Sales'
      : /(content|crafter|assessment)/.test(text)
        ? 'Content'
        : /(learning|tutor|mentor|training)/.test(text)
          ? 'Learning'
          : /(compliance|audit|risk|indas|tax)/.test(text)
            ? 'Compliance'
            : /(contract|legal)/.test(text)
              ? 'Legal'
              : /(dashboard|analytics|mis|report)/.test(text)
                ? 'Analytics'
                : /(ocr|invoice)/.test(text)
                  ? 'Operations'
                  : /(resume|recruit)/.test(text)
                    ? 'HR'
                    : 'General';

  const icon = '';

  const gradient =
    category === 'Sales'
      ? 'from-primary/35 to-purple-500/20'
      : category === 'Content'
        ? 'from-rose-500/25 to-purple-500/20'
        : category === 'Learning'
          ? 'from-emerald-500/25 to-cyan-500/20'
          : category === 'Compliance'
            ? 'from-amber-500/25 to-orange-500/15'
            : category === 'Legal'
              ? 'from-indigo-500/25 to-primary/20'
              : category === 'Analytics'
                ? 'from-cyan-500/25 to-primary/20'
                : category === 'Operations'
                  ? 'from-slate-500/25 to-primary/15'
                  : 'from-white/10 to-white/5';

  const badge: AgentMeta['badge'] =
    index < 3
      ? 'Just Released'
      : /(dashboard|assistant)/.test(text)
        ? 'Trending'
        : /(navigator|platform)/.test(text)
          ? 'Popular'
          : 'Stable';

  return { category, badge, icon, gradient };
}

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const agents = getAgents();

  const agentWithMeta = useMemo(() => {
    return agents.map((a, idx) => ({ agent: a, meta: deriveAgentMeta(a.name, a.description, idx) }));
  }, [agents]);

  const categories = useMemo(() => {
    return Array.from(new Set(agentWithMeta.map(x => x.meta.category))).sort();
  }, [agentWithMeta]);

  const filteredAgents = useMemo(() => {
    let filtered = agentWithMeta;

    if (selectedCategory) {
      filtered = filtered.filter(x => x.meta.category === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(({ agent, meta }) =>
        agent.name.toLowerCase().includes(q) ||
        agent.description.toLowerCase().includes(q) ||
        meta.category.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [searchQuery, agentWithMeta, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">AI Agents</h1>
        <p className="text-muted-foreground">Specialized agents for enterprise automation tasks</p>
      </section>

      {/* Filters Section */}
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 mb-12">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card/70 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-200"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Category filter */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              All
            </button>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  selectedCategory === c
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pb-20">
        {filteredAgents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAgents.map(({ agent, meta }) => (
              <AgentCard key={agent.id} agent={agent} meta={meta} />
            ))}
          </div>
        ) : (
          <div className="glass p-12 rounded-lg text-center">
            <p className="text-muted-foreground text-lg">No agents found matching your criteria</p>
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
