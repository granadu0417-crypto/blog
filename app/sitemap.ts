import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { CATEGORY_IDS } from '@/lib/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kimyido.com';

  // 기본 페이지들
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // 카테고리 페이지들
  const categoryRoutes: MetadataRoute.Sitemap = CATEGORY_IDS.map((id) => ({
    url: `${baseUrl}/category/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // 게시글 페이지들
  const posts = getAllPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 태그 페이지들 - 중복 제거하여 고유한 태그만 추출
  const allTags = posts.reduce((tags: string[], post) => {
    post.tags.forEach(tag => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
    return tags;
  }, []);

  const tagRoutes: MetadataRoute.Sitemap = allTags.map((tag) => ({
    url: `${baseUrl}/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...routes, ...categoryRoutes, ...postRoutes, ...tagRoutes];
}
