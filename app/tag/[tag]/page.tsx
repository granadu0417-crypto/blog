import Link from 'next/link';
import { getPostsByTag, getAllTags, getAllPosts } from '@/lib/posts';
import { getCategoryById, getCategoryColorClass } from '@/lib/categories';
import type { Metadata } from 'next';

interface TagPageProps {
  params: {
    tag: string;
  };
}

// 정적 경로 생성
export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

// 메타데이터 생성
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);

  return {
    title: `#${tag} - 블로그`,
    description: `${tag} 태그가 포함된 게시글 ${posts.length}개`,
    keywords: [tag],
  };
}

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPostsByTag(tag);

  // 관련 태그 찾기 (현재 태그의 게시글에서 다른 태그들)
  const relatedTags = Array.from(
    new Set(
      posts
        .flatMap(post => post.tags)
        .filter(t => t !== tag)
    )
  ).slice(0, 10);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 태그 헤더 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12 border-2 border-blue-200">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">🏷️</span>
          <div>
            <h1 className="text-4xl font-bold text-blue-700">
              #{tag}
            </h1>
            <p className="text-gray-600 mt-2">
              {posts.length}개의 게시글
            </p>
          </div>
        </div>

        {/* 관련 태그 */}
        {relatedTags.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-3 font-medium">관련 태그</p>
            <div className="flex flex-wrap gap-2">
              {relatedTags.map((relatedTag) => (
                <Link
                  key={relatedTag}
                  href={`/tag/${encodeURIComponent(relatedTag)}`}
                  className="text-xs bg-white text-blue-700 px-3 py-1 rounded-full border border-blue-200 font-medium hover:bg-blue-100 transition"
                >
                  #{relatedTag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 네비게이션 */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          총 {posts.length}개의 게시글
        </h2>
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
        >
          ← 전체 보기
        </Link>
      </div>

      {/* 게시글 목록 */}
      {posts.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <span className="text-6xl mb-4 block">🏷️</span>
          <p className="text-gray-600 text-lg mb-2">
            #{tag} 태그를 가진 게시글이 없습니다.
          </p>
          <p className="text-gray-500">
            곧 새로운 콘텐츠가 업데이트될 예정입니다!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const category = getCategoryById(post.category);
            const bgColor = category ? getCategoryColorClass(category.color, 'bg') : 'bg-gray-100';
            const textColor = category ? getCategoryColorClass(category.color, 'text') : 'text-gray-800';

            return (
              <article
                key={post.slug}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* 이미지 영역 */}
                {post.imageUrl ? (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : post.coverImage ? (
                  <div className={`aspect-video ${bgColor} flex items-center justify-center`}>
                    <span className="text-6xl">{post.coverImage}</span>
                  </div>
                ) : category ? (
                  <div className={`aspect-video ${bgColor} flex items-center justify-center`}>
                    <span className="text-6xl">{category.icon}</span>
                  </div>
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-6xl">📝</span>
                  </div>
                )}

                <div className="p-6">
                  {/* 카테고리 배지 */}
                  {category && (
                    <Link
                      href={`/category/${category.id}`}
                      className="inline-block mb-3"
                    >
                      <span className={`text-xs ${bgColor} ${textColor} px-2 py-1 rounded font-medium hover:opacity-80 transition`}>
                        {category.icon} {category.name}
                      </span>
                    </Link>
                  )}

                  {/* 제목 */}
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="hover:text-blue-600 transition"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  {/* 요약 */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* 태그 (현재 태그 강조) */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((postTag) => (
                        <Link
                          key={postTag}
                          href={`/tag/${encodeURIComponent(postTag)}`}
                          className={`text-xs px-2 py-1 rounded ${
                            postTag === tag
                              ? 'bg-blue-100 text-blue-700 font-bold border border-blue-300'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          #{postTag}
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* 메타 정보 */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-3">
                      {post.readTime && (
                        <span>{post.readTime}분</span>
                      )}
                      <Link
                        href={`/posts/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        읽기 →
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
