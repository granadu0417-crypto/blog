import Link from 'next/link';
import Image from 'next/image';
import { getAllPosts } from '@/lib/posts';
import { CATEGORY_LIST, getCategoryById, getCategoryColorClass } from '@/lib/categories';
import { LikeCount } from '@/components/LikeButton';

export default function Home() {
  const posts = getAllPosts();

  // 카테고리별 게시글 수 계산
  const categoryPostCounts = CATEGORY_LIST.map(category => ({
    ...category,
    count: posts.filter(post => post.category === category.id).length,
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 헤더 */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          환영합니다! 👋
        </h1>
        <p className="text-xl text-gray-600">
          유용한 정보와 인사이트를 공유하는 블로그입니다
        </p>
      </div>

      {/* 카테고리 네비게이션 */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">카테고리</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryPostCounts.map((category) => {
            const bgColor = getCategoryColorClass(category.color, 'bg');
            const textColor = getCategoryColorClass(category.color, 'text');
            const borderColor = getCategoryColorClass(category.color, 'border');

            return (
              <Link
                key={category.id}
                href={`/category/${category.id}`}
                className={`${bgColor} rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border-2 ${borderColor} hover:scale-105 relative`}
              >
                <span className="text-4xl mb-2 block">{category.icon}</span>
                <h3 className={`font-bold ${textColor} mb-1`}>
                  {category.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  {category.description}
                </p>
                {category.count > 0 && (
                  <span className={`absolute top-2 right-2 ${bgColor} ${textColor} text-xs font-bold px-2 py-1 rounded-full border ${borderColor}`}>
                    {category.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* 최신 게시글 섹션 */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">최신 게시글</h2>
          {posts.length > 6 && (
            <span className="text-gray-600">
              총 {posts.length}개의 게시글
            </span>
          )}
        </div>

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
            {posts.slice(0, 9).map((post) => {
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
                    <div className="aspect-video overflow-hidden relative">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        loading="lazy"
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

                    {/* 태그 */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Link
                            key={tag}
                            href={`/tag/${encodeURIComponent(tag)}`}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-blue-100 hover:text-blue-700 transition"
                          >
                            #{tag}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* 메타 정보 */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-3">
                        <span>{post.date}</span>
                        <LikeCount slug={post.slug} />
                      </div>
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
      </section>

      {/* 인기 해시태그 섹션 */}
      {posts.length > 0 && (
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">인기 해시태그</h2>
          <div className="flex flex-wrap gap-3">
            {Array.from(new Set(posts.flatMap(post => post.tags)))
              .slice(0, 15)
              .map((tag) => (
                <Link
                  key={tag}
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className="bg-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer border border-gray-200"
                >
                  #{tag}
                </Link>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
