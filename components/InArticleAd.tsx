'use client';

import AdUnit, { AD_SLOTS } from './AdUnit';

interface InArticleAdProps {
  className?: string;
}

/**
 * 인아티클 광고 컴포넌트
 * 게시글 본문 중간에 삽입
 * 콘텐츠와 자연스럽게 어울리는 네이티브 스타일
 */
export default function InArticleAd({ className = '' }: InArticleAdProps) {
  return (
    <div className={`my-8 ${className}`}>
      <AdUnit
        slot={AD_SLOTS.IN_ARTICLE}
        format="fluid"
        layout="in-article"
        style={{ display: 'block', textAlign: 'center' }}
      />
    </div>
  );
}
