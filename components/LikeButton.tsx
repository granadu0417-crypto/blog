'use client';

import { useState, useEffect } from 'react';

interface LikeButtonProps {
  slug: string;
  showCount?: boolean;
}

export default function LikeButton({ slug, showCount = true }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 로컬 스토리지 키 (사용자의 좋아요 여부만 저장)
  const USER_LIKES_KEY = 'blog_user_likes';

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    loadLikes();
  }, [slug]);

  // API에서 좋아요 수 가져오기
  const loadLikes = async () => {
    try {
      setIsLoading(true);

      // API에서 실제 좋아요 수 가져오기
      const response = await fetch(`/api/likes/${encodeURIComponent(slug)}`);
      const data = await response.json();

      if (data.success) {
        setLikes(data.count);
      }

      // 로컬 스토리지에서 사용자의 좋아요 여부 확인
      if (typeof window !== 'undefined') {
        const userLikes = JSON.parse(localStorage.getItem(USER_LIKES_KEY) || '{}');
        setIsLiked(userLikes[slug] || false);
      }
    } catch (error) {
      console.error('Failed to load likes:', error);
      // API 실패 시 로컬 스토리지에서라도 표시
      if (typeof window !== 'undefined') {
        const localLikes = JSON.parse(localStorage.getItem('blog_likes') || '{}');
        setLikes(localLikes[slug] || 0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 좋아요 토글
  const handleLike = async () => {
    if (isLoading) return;

    const newIsLiked = !isLiked;

    try {
      // 낙관적 업데이트 (UI 먼저 변경)
      setIsLiked(newIsLiked);
      setLikes(prev => newIsLiked ? prev + 1 : Math.max(0, prev - 1));

      // 애니메이션
      if (newIsLiked) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 600);
      }

      // API 호출
      const method = newIsLiked ? 'POST' : 'DELETE';
      const response = await fetch(`/api/likes/${encodeURIComponent(slug)}`, { method });
      const data = await response.json();

      if (data.success) {
        // 서버에서 받은 정확한 숫자로 업데이트
        setLikes(data.count);

        // 로컬 스토리지에 사용자 좋아요 여부 저장
        if (typeof window !== 'undefined') {
          const userLikes = JSON.parse(localStorage.getItem(USER_LIKES_KEY) || '{}');
          userLikes[slug] = newIsLiked;
          localStorage.setItem(USER_LIKES_KEY, JSON.stringify(userLikes));
        }
      } else {
        // API 실패 시 롤백
        setIsLiked(!newIsLiked);
        setLikes(prev => newIsLiked ? Math.max(0, prev - 1) : prev + 1);
        console.error('API error:', data.error);
      }
    } catch (error) {
      // 에러 발생 시 롤백
      setIsLiked(!newIsLiked);
      setLikes(prev => newIsLiked ? Math.max(0, prev - 1) : prev + 1);
      console.error('Failed to toggle like:', error);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all
        ${isLiked
          ? 'bg-red-100 text-red-600 hover:bg-red-200'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }
        ${isAnimating ? 'scale-110' : 'scale-100'}
        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      aria-label={isLiked ? '좋아요 취소' : '좋아요'}
    >
      <span className={`text-xl ${isAnimating ? 'animate-bounce' : ''}`}>
        {isLiked ? '❤️' : '🤍'}
      </span>
      {showCount && (
        <span className="text-sm">
          {isLoading ? '...' : likes > 0 ? `좋아요 ${likes}` : '좋아요'}
        </span>
      )}
    </button>
  );
}

// 좋아요 수만 표시하는 컴포넌트 (메인 화면용)
export function LikeCount({ slug }: { slug: string }) {
  const [likes, setLikes] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    loadLikes();
  }, [slug]);

  const loadLikes = async () => {
    try {
      const response = await fetch(`/api/likes/${encodeURIComponent(slug)}`);
      const data = await response.json();

      if (data.success) {
        setLikes(data.count);
      }
    } catch (error) {
      console.error('Failed to load likes:', error);
      // API 실패 시 로컬 스토리지 폴백
      if (typeof window !== 'undefined') {
        const localLikes = JSON.parse(localStorage.getItem('blog_likes') || '{}');
        setLikes(localLikes[slug] || 0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || likes === 0) return null;

  return (
    <div className="flex items-center gap-1 text-red-600 text-sm">
      <span>❤️</span>
      <span>{likes}</span>
    </div>
  );
}
