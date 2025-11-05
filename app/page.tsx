import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          환영합니다! 👋
        </h1>
        <p className="text-xl text-gray-600">
          유용한 정보와 인사이트를 공유하는 블로그입니다
        </p>
      </div>

      {/* 최신 게시글 섹션 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">최신 게시글</h2>
        {posts.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600 text-lg">
              아직 게시글이 없습니다. 첫 번째 게시글을 작성해보세요!
            </p>
            <p className="text-gray-500 mt-4">
              <code className="bg-gray-200 px-2 py-1 rounded">posts</code> 폴더에 
              마크다운 파일을 추가하세요.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.slug}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {post.coverImage && (
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <span className="text-4xl">{post.coverImage}</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    <Link 
                      href={`/posts/${post.slug}`}
                      className="hover:text-blue-600 transition"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.date}</span>
                    <Link 
                      href={`/posts/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      자세히 보기 →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 카테고리/해시태그 섹션 */}
      {posts.length > 0 && (
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">인기 해시태그</h2>
          <div className="flex flex-wrap gap-3">
            {Array.from(new Set(posts.flatMap(post => post.tags))).map((tag) => (
              <span 
                key={tag}
                className="bg-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 transition cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
