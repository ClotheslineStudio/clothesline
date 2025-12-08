// apps/gravity/src/routes/toolkits/[toolkitId]/+page.ts
import type { PageLoad } from "./$types";
import { getToolkitById } from "$lib/data/toolkits";

export const load: PageLoad = ({ params }) => {
  const toolkit = getToolkitById(params.toolkitId);

  if (!toolkit) {
    return {
      status: 404,
      error: new Error("Toolkit not found")
    };
  }

  const total = toolkit.requirements.length;
  const mapped = toolkit.requirements.filter((r) => r.status === "mapped").length;
  const inProgress = toolkit.requirements.filter((r) => r.status === "in-progress").length;

  return {
    toolkit,
    stats: {
      total,
      mapped,
      inProgress,
      unmapped: total - mapped - inProgress
    }
  };
};
