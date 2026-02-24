'use client';

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/navbar';
import { WorkflowCard } from '@/components/workflow-card';
import { getWorkflows } from '@/lib/utils/data';
import { Search } from 'lucide-react';

export default function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);

  const workflows = getWorkflows();
  const departments = Array.from(new Set(workflows.map(w => w.department))).filter(Boolean).sort();

  const filteredWorkflows = useMemo(() => {
    let filtered = workflows;

    if (selectedDepartment) {
      filtered = filtered.filter(w => w.department === selectedDepartment);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(w =>
        w.name.toLowerCase().includes(q) ||
        w.problemStatement.toLowerCase().includes(q) ||
        w.overview.toLowerCase().includes(q) ||
        w.techStack.some(t => t.toLowerCase().includes(q))
      );
    }

    return filtered;
  }, [searchQuery, selectedDepartment]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Workflows</h1>
        <p className="text-muted-foreground">Ready-to-deploy end-to-end automation workflows</p>
      </section>

      {/* Filters Section */}
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 mb-12">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search workflows..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card/70 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedDepartment(null)}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              selectedDepartment === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
          >
            All Workflows
          </button>
          {departments.map(department => (
            <button
              key={department}
              onClick={() => setSelectedDepartment(department)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedDepartment === department
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              {department}
            </button>
          ))}
        </div>
      </section>

      {/* Workflows Grid */}
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 pb-20">
        {filteredWorkflows.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkflows.map(workflow => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
            ))}
          </div>
        ) : (
          <div className="glass p-12 rounded-lg text-center">
            <p className="text-muted-foreground text-lg">No workflows found matching your criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDepartment(null);
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
