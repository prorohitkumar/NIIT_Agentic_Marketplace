export type Prompt = {
  id: number;
  name: string;
  category: string;
  description: string;
  testPrompt: string;
  dataRequirement: string;
  sourceOutputs: string;
  icon: string;
  tags: string[];
  author?: string;
  rating: number;
  uses: number;
  updatedAt: string;
};

