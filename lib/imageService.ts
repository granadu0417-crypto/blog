// 이미지 자동화 서비스
// Unsplash와 Pexels API를 사용하여 고품질 이미지를 자동으로 가져옵니다.

export interface ImageResult {
  url: string;
  downloadUrl: string;
  photographer: string;
  photographerUrl: string;
  alt: string;
  width: number;
  height: number;
  source: 'unsplash' | 'pexels';
}

// Unsplash API
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'mARHwUbfiB7nMDACQgbKAKV0Guy_cmWAtsumV2htpJ4';
const UNSPLASH_API_URL = 'https://api.unsplash.com';

// Pexels API
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '1ZNOIZ70f0oMswRVoLVRWHeqioIxxRQr3CEAH4ZHhOr9E0q9rAEXBsJA';
const PEXELS_API_URL = 'https://api.pexels.com/v1';

/**
 * Unsplash에서 이미지 검색
 */
export async function searchUnsplashImages(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<ImageResult[]> {
  try {
    const url = `${UNSPLASH_API_URL}/search/photos?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&orientation=landscape`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.status}`);
    }

    const data = await response.json();

    return data.results.map((photo: any) => ({
      url: photo.urls.regular,
      downloadUrl: photo.urls.full,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
      alt: photo.alt_description || query,
      width: photo.width,
      height: photo.height,
      source: 'unsplash' as const,
    }));
  } catch (error) {
    console.error('Unsplash API error:', error);
    return [];
  }
}

/**
 * Pexels에서 이미지 검색
 */
export async function searchPexelsImages(
  query: string,
  page: number = 1,
  perPage: number = 10
): Promise<ImageResult[]> {
  try {
    const url = `${PEXELS_API_URL}/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&orientation=landscape`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': PEXELS_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.status}`);
    }

    const data = await response.json();

    return data.photos.map((photo: any) => ({
      url: photo.src.large,
      downloadUrl: photo.src.original,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
      alt: photo.alt || query,
      width: photo.width,
      height: photo.height,
      source: 'pexels' as const,
    }));
  } catch (error) {
    console.error('Pexels API error:', error);
    return [];
  }
}

/**
 * 두 API에서 모두 검색하여 결과 합치기
 */
export async function searchImages(
  query: string,
  totalResults: number = 10
): Promise<ImageResult[]> {
  const perSource = Math.ceil(totalResults / 2);

  const [unsplashResults, pexelsResults] = await Promise.all([
    searchUnsplashImages(query, 1, perSource),
    searchPexelsImages(query, 1, perSource),
  ]);

  // 두 소스의 결과를 섞어서 반환
  const allResults = [...unsplashResults, ...pexelsResults];
  return allResults.slice(0, totalResults);
}

/**
 * 카테고리별 추천 키워드
 */
export const CATEGORY_IMAGE_KEYWORDS: Record<string, string[]> = {
  finance: ['money', 'finance', 'investment', 'stock market', 'cryptocurrency', 'savings'],
  tech: ['technology', 'computer', 'coding', 'artificial intelligence', 'software', 'gadgets'],
  health: ['health', 'fitness', 'exercise', 'wellness', 'yoga', 'nutrition'],
  realestate: ['real estate', 'house', 'interior design', 'architecture', 'home'],
  education: ['education', 'learning', 'books', 'study', 'classroom', 'knowledge'],
  lifestyle: ['lifestyle', 'living', 'home', 'daily life', 'organization'],
  travel: ['travel', 'vacation', 'tourism', 'destination', 'adventure', 'food'],
  hobby: ['hobby', 'cooking', 'reading', 'movies', 'music', 'arts'],
  shopping: ['shopping', 'products', 'ecommerce', 'retail', 'deals'],
  trend: ['trending', 'news', 'popular', 'viral', 'social media'],
};

/**
 * 카테고리에 맞는 이미지 가져오기
 */
export async function getImageForCategory(
  category: string,
  customKeyword?: string
): Promise<ImageResult | null> {
  const keywords = CATEGORY_IMAGE_KEYWORDS[category] || ['blog', 'article'];
  const keyword = customKeyword || keywords[Math.floor(Math.random() * keywords.length)];

  const images = await searchImages(keyword, 5);
  
  if (images.length > 0) {
    // 랜덤하게 하나 선택
    return images[Math.floor(Math.random() * images.length)];
  }

  return null;
}

/**
 * 제목/키워드에 맞는 이미지 가져오기
 */
export async function getImageForPost(
  title: string,
  category?: string,
  tags: string[] = []
): Promise<ImageResult | null> {
  // 우선순위: 태그 > 제목의 주요 키워드 > 카테고리
  let searchQuery = '';

  if (tags.length > 0) {
    searchQuery = tags[0];
  } else if (title) {
    // 제목에서 주요 키워드 추출 (간단한 방법)
    const words = title.split(' ').filter(word => word.length > 3);
    searchQuery = words[0] || title;
  } else if (category) {
    const categoryKeywords = CATEGORY_IMAGE_KEYWORDS[category];
    if (categoryKeywords) {
      searchQuery = categoryKeywords[0];
    }
  }

  if (!searchQuery) {
    searchQuery = 'blog article';
  }

  const images = await searchImages(searchQuery, 5);
  
  if (images.length > 0) {
    return images[0]; // 가장 관련성 높은 이미지
  }

  return null;
}

/**
 * 이미지 다운로드 (서버 사이드에서만 사용)
 */
export async function downloadImage(imageUrl: string, outputPath: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Node.js 환경에서만 작동
    if (typeof window === 'undefined') {
      const fs = await import('fs');
      const path = await import('path');
      
      // 디렉토리 생성
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      fs.writeFileSync(outputPath, buffer);
      return true;
    }

    return false;
  } catch (error) {
    console.error('Image download error:', error);
    return false;
  }
}

/**
 * 이미지 URL 생성 (Unsplash/Pexels 크레딧 포함)
 */
export function generateImageCredit(image: ImageResult): string {
  if (image.source === 'unsplash') {
    return `Photo by [${image.photographer}](${image.photographerUrl}) on [Unsplash](https://unsplash.com)`;
  } else if (image.source === 'pexels') {
    return `Photo by [${image.photographer}](${image.photographerUrl}) on [Pexels](https://pexels.com)`;
  }
  return '';
}
