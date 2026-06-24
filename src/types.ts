export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  fullDetails: string;
  image: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  demoType: "nexus" | "hyperspace";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  bullets: string[];
  badge?: string;
}

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "tools" | "other";
  level: number; // 1-5
  color: string;
}
