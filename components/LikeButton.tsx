'use client';

import { useState, useEffect } from 'react';

interface LikeButtonProps {
  slug: string;
  showCount?: boolean; // 좋아요 수 표시 여부
}

export default function LikeButton({ slug, showCount = true }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // 로컬 스토리지 키
  const LIKES_KEY = 'blog_likes';
  const USER_LIKES_KEY = 'blog_user_likes';

  // 컴포넌트 마운트 시 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 전체 좋아요 수
      const allLikes = JSON.parse(localStorage.getItem(LIKES_KEY) || '{}');
      setLikes(allLikes[slug] || 0);

      // 사용자 좋아요 여부
      const userLikes = JSON.parse(localStorage.getItem(USER_LIKES_KEY) || '{}');
      setIsLiked(userLikes[slug] || false);
    }
  }, [slug]);

  // 좋아요 토글 함수
  const handleLike = () => {
    if (typeof window === 'undefined') return;

    const allLikes = JSON.parse(localStorage.getItem(LIKES_KEY) || '{}');
    const userLikes = JSON.parse(localStorage.getItem(USER_LIKES_KEY) || '{}');

    if (isLiked) {
      // 좋아요 취소
      const newLikes = Math.max(0, (allLikes[slug] || 0) - 1);
      allLikes[slug] = newLikes;
      userLikes[slug] = false;
      setLikes(newLikes);
      setIsLiked(false);
    } else {
      // 좋아요 추가
      const newLikes = (allLikes[slug] || 0) + 1;
      allLikes[slug] = newLikes;
      userLikes[slug] = true;
      setLikes(newLikes);
      setIsLiked(true);

      // 애니메이션 트리거
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }

    // 로컬 스토리지 저장
    localStorage.setItem(LIKES_KEY, JSON.stringify(allLikes));
    localStorage.setItem(USER_LIKES_KEY, JSON.stringify(userLikes));
  };

  return (
    <button
      onClick={handleLike}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
        ${isLiked
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
        ${isAnimating ? 'scale-110' : 'scale-100'}
      `}
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
    >
      <span className={`text-xl ${isAnimating ? 'animate-bounce' : ''}`}>
        {isLiked ? '❤️' : '🤍'}
      </span>
      {showCount && (
        <span className="text-sm">
          {likes > 0 ? `좋아요 ${likes}` : '좋아요'}
        </span>
      )}
    </button>
  );
}

// 좋아요 수만 표시하는 컴포넌트 (메인 화면용)
export function LikeCount({ slug }: { slug: string }) {
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const allLikes = JSON.parse(localStorage.getItem('blog_likes') || '{}');
      setLikes(allLikes[slug] || 0);

      // 로컬 스토리지 변경 감지
      const handleStorageChange = () => {
        const updatedLikes = JSON.parse(localStorage.getItem('blog_likes') || '{}');
        setLikes(updatedLikes[slug] || 0);
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [slug]);

  if (likes === 0) return null;

  return (
    <div className="flex items-center gap-1 text-red-600 text-sm">
      <span>❤️</span>
      <span>{likes}</span>
    </div>
  );
}
