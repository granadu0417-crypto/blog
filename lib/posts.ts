import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string; // 카테고리 추가
  coverImage?: string;
  imageUrl?: string; // 외부 이미지 URL
  author?: string;
  readTime?: number; // 읽는 시간 (분)
}

// 모든 게시글 가져오기 (카테고리별 서브폴더 지원)
export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const allPostsData: Post[] = [];

  // posts 루트의 파일들
  const rootFiles = fs.readdirSync(postsDirectory);
  rootFiles.forEach((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 카테고리 폴더인 경우
      const categoryPosts = getPostsByCategory(fileName);
      allPostsData.push(...categoryPosts);
    } else if (fileName.endsWith('.md')) {
      // 루트에 있는 마크다운 파일
      const slug = fileName.replace(/\.md$/, '');
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      allPostsData.push({
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || content.substring(0, 200) + '...',
        content,
        tags: data.tags || [],
        category: data.category || 'uncategorized',
        coverImage: data.coverImage,
        imageUrl: data.imageUrl,
        author: data.author,
        readTime: data.readTime || calculateReadTime(content),
      });
    }
  });

  // 날짜순 정렬 (최신순)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });
}

// 카테고리별 게시글 가져오기
export function getPostsByCategory(category: string): Post[] {
  const categoryPath = path.join(postsDirectory, category);
  
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(categoryPath);
  const categoryPosts = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = `${category}/${fileName.replace(/\.md$/, '')}`;
      const fullPath = path.join(categoryPath, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || fileName.replace(/\.md$/, ''),
        date: data.date || new Date().toISOString().split('T')[0],
        excerpt: data.excerpt || content.substring(0, 200) + '...',
        content,
        tags: data.tags || [],
        category: data.category || category,
        coverImage: data.coverImage,
        imageUrl: data.imageUrl,
        author: data.author,
        readTime: data.readTime || calculateReadTime(content),
      };
    });

  // 날짜순 정렬 (최신순)
  return categoryPosts.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });
}

// 특정 게시글 가져오기
export function getPostBySlug(slug: string): Post | null {
  try {
    // 슬러그가 카테고리/파일명 형식인 경우
    const fullPath = slug.includes('/')
      ? path.join(postsDirectory, `${slug}.md`)
      : path.join(postsDirectory, `${slug}.md`);

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const category = slug.includes('/') ? slug.split('/')[0] : (data.category || 'uncategorized');

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString().split('T')[0],
      excerpt: data.excerpt || content.substring(0, 200) + '...',
      content,
      tags: data.tags || [],
      category,
      coverImage: data.coverImage,
      imageUrl: data.imageUrl,
      author: data.author,
      readTime: data.readTime || calculateReadTime(content),
    };
  } catch (error) {
    return null;
  }
}

// 모든 게시글 슬러그 가져오기
export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const slugs: string[] = [];
  const items = fs.readdirSync(postsDirectory);

  items.forEach((item) => {
    const fullPath = path.join(postsDirectory, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // 카테고리 폴더
      const files = fs.readdirSync(fullPath);
      files
        .filter(fileName => fileName.endsWith('.md'))
        .forEach(fileName => {
          slugs.push(`${item}/${fileName.replace(/\.md$/, '')}`);
        });
    } else if (item.endsWith('.md')) {
      // 루트 파일
      slugs.push(item.replace(/\.md$/, ''));
    }
  });

  return slugs;
}

// 태그별 게시글 가져오기
export function getPostsByTag(tag: string): Post[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

// 카테고리 목록 가져오기 (실제 게시글이 있는 카테고리만)
export function getAvailableCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = new Set(allPosts.map(post => post.category));
  return Array.from(categories);
}

// 모든 태그 가져오기
export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set(allPosts.flatMap(post => post.tags));
  return Array.from(tags);
}

// 읽는 시간 계산 (평균 200단어/분)
function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return readTime;
}

// 관련 게시글 가져오기 (같은 카테고리 또는 같은 태그)
export function getRelatedPosts(currentPost: Post, limit: number = 3): Post[] {
  const allPosts = getAllPosts().filter(post => post.slug !== currentPost.slug);
  
  // 같은 카테고리의 게시글
  const sameCategoryPosts = allPosts.filter(post => post.category === currentPost.category);
  
  // 같은 태그를 가진 게시글
  const sameTagPosts = allPosts.filter(post => 
    post.tags.some(tag => currentPost.tags.includes(tag))
  );

  // 중복 제거 및 병합 (Array.from 사용)
  const combinedPosts = sameCategoryPosts.concat(sameTagPosts);
  const uniqueSlugs = new Set<string>();
  const relatedPosts: Post[] = [];
  
  for (const post of combinedPosts) {
    if (!uniqueSlugs.has(post.slug)) {
      uniqueSlugs.add(post.slug);
      relatedPosts.push(post);
    }
  }
  
  return relatedPosts.slice(0, limit);
}
