import prompts from '@/lib/data/prompts.json';
import workflows from '@/lib/data/workflows.json';
import agents from '@/lib/data/agents.json';

export type Prompt = (typeof prompts)[0];
export type Workflow = (typeof workflows)[0];
export type Agent = (typeof agents)[0];

export const getPrompts = (): Prompt[] => prompts;

export const getPromptById = (id: number): Prompt | undefined => {
  return prompts.find(p => p.id === id);
};

export const searchPrompts = (query: string): Prompt[] => {
  const q = query.toLowerCase();
  return prompts.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(tag => tag.toLowerCase().includes(q))
  );
};

export const filterPromptsByCategory = (category: string): Prompt[] => {
  return prompts.filter(p => p.category === category);
};

export const getPromptCategories = (): string[] => {
  return Array.from(new Set(prompts.map(p => p.category)));
};

export const getWorkflows = (): Workflow[] => workflows;

export const getWorkflowById = (id: string): Workflow | undefined => {
  return workflows.find(w => w.id === id);
};

export const searchWorkflows = (query: string): Workflow[] => {
  const q = query.toLowerCase();
  return workflows.filter(w =>
    w.name.toLowerCase().includes(q) ||
    (w as unknown as { overview?: string }).overview?.toLowerCase().includes(q) ||
    (w as unknown as { problemStatement?: string }).problemStatement?.toLowerCase().includes(q)
  );
};

export const getAgents = (): Agent[] => agents;

export const getAgentById = (id: number): Agent | undefined => {
  return agents.find(a => a.id === id);
};

export const searchAgents = (query: string): Agent[] => {
  const q = query.toLowerCase();
  return agents.filter(a =>
    a.name.toLowerCase().includes(q) ||
    a.description.toLowerCase().includes(q)
  );
};

export const getAgentsByType = (_type: string): Agent[] => agents;
export const getAgentTypes = (): string[] => [];
