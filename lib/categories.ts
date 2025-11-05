// 카테고리 정의
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  keywords: string[]; // SEO 키워드
}

// 10개 고수익 카테고리
export const CATEGORIES: Record<string, Category> = {
  finance: {
    id: 'finance',
    name: '금융/투자',
    description: '주식, 코인, 재테크, 저축 정보',
    icon: '💰',
    color: 'emerald',
    keywords: ['주식', '투자', '재테크', '코인', '저축', '펀드', '부자', '돈'],
  },
  tech: {
    id: 'tech',
    name: 'IT/테크',
    description: '프로그래밍, AI, 가젯 리뷰',
    icon: '💻',
    color: 'blue',
    keywords: ['프로그래밍', 'AI', '개발', '코딩', '가젯', '기술', '앱', '소프트웨어'],
  },
  health: {
    id: 'health',
    name: '건강/웰빙',
    description: '다이어트, 운동, 영양, 정신건강',
    icon: '🏃',
    color: 'green',
    keywords: ['다이어트', '운동', '건강', '영양', '헬스', '요가', '명상', '웰빙'],
  },
  realestate: {
    id: 'realestate',
    name: '부동산/인테리어',
    description: '집꾸미기, 투자, 매매 정보',
    icon: '🏠',
    color: 'orange',
    keywords: ['부동산', '아파트', '인테리어', '집', '매매', '전세', '월세', '집꾸미기'],
  },
  education: {
    id: 'education',
    name: '교육/자기계발',
    description: '영어, 자격증, 온라인 강의',
    icon: '📚',
    color: 'purple',
    keywords: ['교육', '영어', '자격증', '공부', '강의', '학습', '자기계발', '독서'],
  },
  lifestyle: {
    id: 'lifestyle',
    name: '생활정보',
    description: '생활 꿀팁, 절약, 알뜰정보',
    icon: '✨',
    color: 'pink',
    keywords: ['생활', '꿀팁', '절약', '알뜰', '정보', '팁', '노하우', '생활정보'],
  },
  travel: {
    id: 'travel',
    name: '여행/맛집',
    description: '국내여행, 맛집 추천, 카페',
    icon: '✈️',
    color: 'cyan',
    keywords: ['여행', '맛집', '카페', '관광', '국내여행', '해외여행', '맛집추천', '여행지'],
  },
  hobby: {
    id: 'hobby',
    name: '취미/라이프스타일',
    description: '요리, 독서, 영화/드라마',
    icon: '🎨',
    color: 'indigo',
    keywords: ['취미', '요리', '독서', '영화', '드라마', '게임', '음악', '라이프스타일'],
  },
  shopping: {
    id: 'shopping',
    name: '쇼핑/리뷰',
    description: '제품 비교, 추천, 할인정보',
    icon: '🛍️',
    color: 'red',
    keywords: ['쇼핑', '리뷰', '추천', '할인', '제품', '비교', '구매', '최저가'],
  },
  trend: {
    id: 'trend',
    name: '트렌드/뉴스',
    description: '핫이슈, 최신 트렌드',
    icon: '🔥',
    color: 'yellow',
    keywords: ['트렌드', '뉴스', '이슈', '핫', '최신', '유행', '화제', '인기'],
  },
};

// 카테고리 ID 배열
export const CATEGORY_IDS = Object.keys(CATEGORIES);

// 카테고리 목록 (배열)
export const CATEGORY_LIST = Object.values(CATEGORIES);

// 카테고리 ID로 카테고리 정보 가져오기
export function getCategoryById(id: string): Category | null {
  return CATEGORIES[id] || null;
}

// 카테고리 색상 클래스 가져오기
export function getCategoryColorClass(color: string, variant: 'bg' | 'text' | 'border' = 'bg'): string {
  const colorMap: Record<string, Record<string, string>> = {
    emerald: {
      bg: 'bg-emerald-100',
      text: 'text-emerald-800',
      border: 'border-emerald-300',
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-300',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
    },
    orange: {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      border: 'border-orange-300',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      border: 'border-purple-300',
    },
    pink: {
      bg: 'bg-pink-100',
      text: 'text-pink-800',
      border: 'border-pink-300',
    },
    cyan: {
      bg: 'bg-cyan-100',
      text: 'text-cyan-800',
      border: 'border-cyan-300',
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-800',
      border: 'border-indigo-300',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300',
    },
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300',
    },
  };

  return colorMap[color]?.[variant] || colorMap.blue[variant];
}
