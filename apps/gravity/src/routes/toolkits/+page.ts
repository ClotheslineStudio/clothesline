// apps/gravity/src/routes/toolkits/+page.ts
import { listToolkits } from "$lib/data/toolkits";

export function load() {
  return {
    toolkits: listToolkits()
  };
}

export type ToolkitsPageData = ReturnType<typeof load> extends Promise<infer R>
  ? R
  : ReturnType<typeof load>;
