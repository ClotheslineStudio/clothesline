// apps/gravity/src/lib/data/toolkits.ts

export type ToolkitRequirementStatus =
  | "unmapped"
  | "in-progress"
  | "mapped";

export type ToolkitRequirement = {
  id: string;
  code?: string;
  title: string;
  description?: string;
  category?: string;
  status: ToolkitRequirementStatus;
};

export type Toolkit = {
  id: string;
  name: string;
  source: string;
  version?: string;
  importedAt: string;
  requirements: ToolkitRequirement[];
};

const TOOLKITS: Toolkit[] = [
  {
    id: "idea-part-b",
    name: "IDEA Part B Monitoring Toolkit",
    source: "US Department of Education · OSEP",
    version: "2024",
    importedAt: "2025-01-05",
    requirements: [
      {
        id: "idea-1-1",
        code: "1.1",
        title: "Data governance policies are documented and current.",
        category: "Governance",
        status: "unmapped"
      },
      {
        id: "idea-1-2",
        code: "1.2",
        title: "SEA regularly reviews LEA data quality.",
        category: "Data Quality",
        status: "in-progress"
      },
      {
        id: "idea-2-1",
        code: "2.1",
        title: "Monitoring schedule is published and communicated.",
        category: "Monitoring",
        status: "mapped"
      }
    ]
  },
  {
    id: "essa",
    name: "ESSA Consolidated Planning Toolkit",
    source: "US Department of Education",
    version: "2023",
    importedAt: "2024-11-12",
    requirements: [
      {
        id: "essa-1-1",
        code: "A.1",
        title: "Stakeholder engagement plan is documented.",
        category: "Engagement",
        status: "unmapped"
      }
    ]
  }
];

export function listToolkits(): Toolkit[] {
  return TOOLKITS;
}

export function getToolkitById(id: string): Toolkit | undefined {
  return TOOLKITS.find((t) => t.id === id);
}
