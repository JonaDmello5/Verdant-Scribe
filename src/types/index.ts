export type PlantType = 'flower' | 'tree' | 'vine';

export type Post = {
  id: number;
  title: string;
  content: string;
  position: { x: number; y: number };
  type: PlantType;
  growth: number; // 0.1 to 1.0
  isComposting?: boolean;
};
