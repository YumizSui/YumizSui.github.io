import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.lang === 'en';
  });

  const sortedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: 'Kairi Furui - Blog',
    description: 'Kairi Furui\'s Blog',
    site: context.site || 'https://yumizsui.com',
    items: sortedPosts.map((post) => {
      const slug = post.slug.startsWith('en/') ? post.slug.replace('en/', '') : post.slug;
      return {
        title: post.data.title,
        description: post.data.description || '',
        pubDate: post.data.pubDate,
        link: `/en/blog/${slug}/`,
      };
    }),
    customData: `<language>en</language>`,
  });
}
