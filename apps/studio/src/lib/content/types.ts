// src/lib/content/types.ts

// ---------- Skills ----------
export type SkillId = string;

export type SkillCategory = 'design' | 'dev' | 'data' | 'ops' | 'comms' | 'other';

export type Skill = {
  id: SkillId;
  label: string;
  category?: SkillCategory;
  icon?: string;   // optional inline SVG/HTML string
  blurb: string;   // short narrative description
};

// ---------- Apps ----------
export type AppStatus = 'idea' | 'prototype' | 'alpha' | 'beta' | 'live';

export type App = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: AppStatus;
  category?: 'tool' | 'product' | 'internal' | 'client';
  thumbnail: string;
  url?: string;         // live app
  docsUrl?: string;     // docs site
  repoUrl?: string;     // GitHub
  figmaUrl?: string;    // Figma file
  techStack?: string[]; // e.g. ['SvelteKit', 'Tailwind', 'TypeScript']
  highlights?: string[];// short bullets for an Apps listing page
};

// ---------- Projects ----------
export type ProjectTabId =
  | 'overview'
  | 'role'
  | 'challenges'
  | 'outcomes'
  | 'skills';

export type ProjectTab = {
  id: ProjectTabId;
  label: string;
  narrative: string;
  image?: string;       // hero image per tab
  skillIds?: SkillId[]; // which skills to show as badges on this tab
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  client?: string;
  period?: string;
  url?: string;         // external link (site, repo, docs, etc.)
  thumbnail: string;    // card image
  tabs: ProjectTab[];
};

// ---------- Services ----------
export type Service = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  targetClients?: string[];
  startingPrice?: string;
  highlightProjectSlugs?: string[]; // related projects
};

// ---------- Testimonials ----------
export type Testimonial = {
  text: string;
  author: string;       // "Name, Role, Org"
  img: string;
  linkedin?: string;
  github?: string;
  logo?: string;
};

// ---------- Resources / Links ----------
export type Resource = {
  id: string;
  title: string;
  url: string;
  type: 'site' | 'doc' | 'video' | 'repo' | 'article' | 'tool';
  description?: string;
  projectSlugs?: string[];
  skillIds?: SkillId[];
};
