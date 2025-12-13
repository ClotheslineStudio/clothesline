// routes/blog/+page.ts
export async function load() {
    const allPostFiles = import.meta.glob('$lib/content/blog/*.md');
  
    const posts = await Promise.all(
      Object.entries(allPostFiles).map(async ([path, resolver]) => {
        const post: any = await resolver();
        const slug = path.split('/').pop()?.replace('.md', '');
  
        return {
          metadata: post.metadata,
          slug
        };
      })
    );
  
    return {
      posts: posts.sort((a, b) =>
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
      )
    };
  }
  