// apps/gravity/src/routes/toolkits/[toolkitId]/requirements/+page.ts
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

  return { toolkit };
};
