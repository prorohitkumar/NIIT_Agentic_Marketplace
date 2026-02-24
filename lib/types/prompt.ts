export type Prompt = {
  id: number;
  name: string;
  category: string;
  description: string;
  detailedDescription: string;
  icon: string;
  tags: string[];
  author?: string;
  rating: number;
  uses: number;
  updatedAt: string;
};

