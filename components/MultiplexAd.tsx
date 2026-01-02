'use client';

import AdUnit, { AD_SLOTS } from './AdUnit';

interface MultiplexAdProps {
  className?: string;
}

/**
 * 멀티플렉스 광고 컴포넌트
 * 관련 콘텐츠 추천 형식의 그리드 광고
 * 게시글 하단이나 사이드바에 적합
 */
export default function MultiplexAd({ className = '' }: MultiplexAdProps) {
  return (
    <div className={`my-8 ${className}`}>
      <AdUnit
        slot={AD_SLOTS.MULTIPLEX}
        format="autorelaxed"
        style={{ display: 'block' }}
      />
    </div>
  );
}
