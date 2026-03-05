import type { LayoutServerLoad } from './$types';
import { getDocsNav } from '$lib/docs/content';

export const load: LayoutServerLoad = async () => {
  return {
    docs: getDocsNav()
  };
};
