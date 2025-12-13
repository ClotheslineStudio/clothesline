// src/routes/+page.ts
import type { PageLoad } from './$types';

interface BlogPost {
  metadata: {
    date: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export const load: PageLoad = async () => {
  const allPostFiles = import.meta.glob('$lib/content/blog/*.md');

  const posts = await Promise.all(
    Object.entries(allPostFiles).map(async ([path, resolver]) => {
      const post = await resolver() as BlogPost;
      const slug = path.split('/').pop()?.replace('.md', '');

      return {
        slug,
        metadata: post.metadata
      };
    })
  );

  const recentPosts = posts
    .sort(
      (a, b) =>
        new Date(b.metadata.date).getTime() -
        new Date(a.metadata.date).getTime()
    )
    .slice(0, 2); // show top 2 on the home page

  return {
    recentPosts
  };
};
