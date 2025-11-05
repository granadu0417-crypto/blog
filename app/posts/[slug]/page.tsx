import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';
import type { Metadata } from 'next';
import Link from 'next/link';
import LikeButton from '@/components/LikeButton';
import ShareButtons from '@/components/ShareButtons';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다',
    };
  }

  return {
    title: `${post.title} | 내 블로그`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const processedContent = await remark()
    .use(html)
    .process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 헤더 */}
      <header className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition"
            >
              #{tag}
            </Link>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {post.title}
        </h1>
        <div className="flex items-center text-gray-600">
          <time dateTime={post.date}>{post.date}</time>
        </div>
      </header>

      {/* 커버 이미지 */}
      {post.coverImage && (
        <div className="mb-8 aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
          <span className="text-6xl">{post.coverImage}</span>
        </div>
      )}

      {/* 본문 */}
      <div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* 좋아요 버튼 */}
      <div className="flex justify-center mb-8">
        <LikeButton slug={post.slug} />
      </div>

      {/* 공유 버튼 */}
      <ShareButtons title={post.title} slug={post.slug} />
    </article>
  );
}
