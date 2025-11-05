import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { CATEGORY_IDS } from '@/lib/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://blog-7xx.pages.dev';
  
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

  return [...routes, ...categoryRoutes, ...postRoutes];
}
