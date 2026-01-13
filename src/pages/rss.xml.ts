import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => {
    return data.lang === 'ja';
  });

  const sortedPosts = posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: '@YumizSui',
    description: '@YumizSui',
    site: context.site || 'https://yumizsui.com',
    items: sortedPosts.map((post) => {
      const slug = post.slug.startsWith('ja/') ? post.slug.replace('ja/', '') : post.slug;
      return {
        title: post.data.title,
        description: post.data.description || '',
        pubDate: post.data.pubDate,
        link: `/blog/${slug}/`,
      };
    }),
    customData: `<language>ja</language>`,
  });
}
