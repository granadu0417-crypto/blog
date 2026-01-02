import Link from 'next/link';
import { Post } from '@/lib/posts';

interface RelatedPostsProps {
  posts: Post[];
  title?: string;
}

/**
 * 관련 글 추천 컴포넌트
 * lightsaltsound.com 스타일의 캐러셀/그리드 형태로 관련 글을 표시합니다.
 */
export default function RelatedPosts({ posts, title = '함께 보면 좋은 글' }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="my-12 py-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span>📚</span> {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* 썸네일 영역 */}
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              {post.coverImage ? (
                <span className="text-4xl">{post.coverImage}</span>
              ) : (
                <span className="text-4xl">📝</span>
              )}
            </div>

            {/* 컨텐츠 영역 */}
            <div className="p-4">
              {/* 카테고리 뱃지 */}
              <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full mb-2">
                {post.category}
              </span>

              {/* 제목 */}
              <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                {post.title}
              </h3>

              {/* 날짜 */}
              <time className="text-sm text-gray-500">{post.date}</time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
