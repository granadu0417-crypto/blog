import { getAllPosts } from '@/lib/posts';

export async function GET() {
  const baseUrl = 'https://kimyido.com';
  const posts = getAllPosts();

  const rssItems = posts
    .map((post) => {
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/posts/${post.slug}</link>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid>${baseUrl}/posts/${post.slug}</guid>
      <category>${post.category}</category>
    </item>`;
    })
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>kimyido.com - 블로그</title>
    <link>${baseUrl}</link>
    <description>기술, 재테크, 건강, 라이프스타일 등 다양한 주제의 실용적인 정보를 공유하는 블로그</description>
    <language>ko</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
    },
  });
}
