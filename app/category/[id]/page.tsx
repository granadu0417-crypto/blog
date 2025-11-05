import Link from 'next/link';
import { getPostsByCategory, getAllPosts } from '@/lib/posts';
import { getCategoryById, CATEGORY_IDS, getCategoryColorClass } from '@/lib/categories';
import { notFound } from 'next/navigation';

interface CategoryPageProps {
  params: {
    id: string;
  };
}

// 정적 경로 생성
export async function generateStaticParams() {
  return CATEGORY_IDS.map((id) => ({
    id: id,
  }));
}

// 메타데이터 생성
export async function generateMetadata({ params }: CategoryPageProps) {
  const category = getCategoryById(params.id);
  
  if (!category) {
    return {
      title: '카테고리를 찾을 수 없습니다',
    };
  }

  return {
    title: `${category.name} - 블로그`,
    description: category.description,
    keywords: category.keywords.join(', '),
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryById(params.id);
  
  if (!category) {
    notFound();
  }

  // 해당 카테고리의 게시글 가져오기
  const categoryPosts = getPostsByCategory(params.id);
  
  // 전체 게시글에서 해당 카테고리로 필터링 (폴더가 없는 경우 대비)
  const allPosts = getAllPosts();
  const filteredPosts = allPosts.filter(post => post.category === params.id);
  
  // 합치기 (중복 제거)
  const posts = [...categoryPosts, ...filteredPosts].filter((post, index, self) =>
    index === self.findIndex((p) => p.slug === post.slug)
  );

  const bgColor = getCategoryColorClass(category.color, 'bg');
  const textColor = getCategoryColorClass(category.color, 'text');
  const borderColor = getCategoryColorClass(category.color, 'border');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 카테고리 헤더 */}
      <div className={`${bgColor} rounded-2xl p-8 mb-12 border-2 ${borderColor}`}>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl">{category.icon}</span>
          <div>
            <h1 className={`text-4xl font-bold ${textColor}`}>
              {category.name}
            </h1>
            <p className="text-gray-600 mt-2">
              {category.description}
            </p>
          </div>
        </div>
        
        {/* 키워드 태그 */}
        <div className="flex flex-wrap gap-2 mt-6">
          {category.keywords.slice(0, 8).map((keyword) => (
            <span 
              key={keyword}
              className={`text-xs ${bgColor} ${textColor} px-3 py-1 rounded-full border ${borderColor} font-medium`}
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>

      {/* 게시글 수 표시 */}
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
          <span className="text-6xl mb-4 block">{category.icon}</span>
          <p className="text-gray-600 text-lg mb-2">
            아직 {category.name} 카테고리의 게시글이 없습니다.
          </p>
          <p className="text-gray-500">
            곧 유용한 콘텐츠가 업데이트될 예정입니다!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const postCategory = getCategoryById(post.category);
            
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
                ) : (
                  <div className={`aspect-video ${bgColor} flex items-center justify-center`}>
                    <span className="text-6xl">{category.icon}</span>
                  </div>
                )}

                <div className="p-6">
                  {/* 카테고리 배지 */}
                  {postCategory && (
                    <div className="mb-3">
                      <span className={`text-xs ${getCategoryColorClass(postCategory.color, 'bg')} ${getCategoryColorClass(postCategory.color, 'text')} px-2 py-1 rounded font-medium`}>
                        {postCategory.icon} {postCategory.name}
                      </span>
                    </div>
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
                        <span 
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 메타 정보 */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.date}</span>
                    {post.readTime && (
                      <span>{post.readTime}분 읽기</span>
                    )}
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
