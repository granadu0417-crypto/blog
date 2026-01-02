import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import type { Metadata } from 'next';
import Link from 'next/link';
import LikeButton from '@/components/LikeButton';
import ShareButtons from '@/components/ShareButtons';
import TableOfContents from '@/components/TableOfContents';
import { ArticleSchema, BreadcrumbSchema } from '@/components/StructuredData';
import InArticleAd from '@/components/InArticleAd';
import MultiplexAd from '@/components/MultiplexAd';
import RelatedPosts from '@/components/RelatedPosts';

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
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(post.content);
  const contentHtml = processedContent.toString();

  const baseUrl = 'https://kimyido.com';
  const postUrl = `${baseUrl}/posts/${params.slug}`;

  // 관련 글 가져오기
  const relatedPosts = getRelatedPosts(post, 6);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 구조화된 데이터 마크업 */}
      <ArticleSchema
        title={post.title}
        description={post.excerpt}
        url={postUrl}
        datePublished={post.date}
        dateModified={post.date}
        author="kimyido"
        category={post.category}
        tags={post.tags}
        imageUrl={post.imageUrl}
      />
      <BreadcrumbSchema
        items={[
          { name: '홈', url: baseUrl },
          { name: post.category, url: `${baseUrl}/category/${post.category}` },
          { name: post.title, url: postUrl },
        ]}
      />

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
      {post.imageUrl && (
        <div className="mb-8 aspect-video relative rounded-lg overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      )}

      {/* 목차 */}
      <TableOfContents content={post.content} />

      {/* 광고 - 본문 상단 */}
      <InArticleAd />

      {/* 본문 */}
      <div
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* 광고 - 관련 콘텐츠 스타일 */}
      <MultiplexAd />

      {/* 좋아요 버튼 */}
      <div className="flex justify-center mb-8">
        <LikeButton slug={post.slug} />
      </div>

      {/* 공유 버튼 */}
      <ShareButtons title={post.title} slug={post.slug} />

      {/* 관련 글 추천 */}
      <RelatedPosts posts={relatedPosts} />
    </article>
  );
}
