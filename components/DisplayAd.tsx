'use client';

import AdUnit, { AD_SLOTS } from './AdUnit';

interface DisplayAdProps {
  className?: string;
}

/**
 * 디스플레이 광고 컴포넌트
 * 헤더, 푸터, 사이드바 등에 사용
 * 반응형으로 자동 크기 조절
 */
export default function DisplayAd({ className = '' }: DisplayAdProps) {
  return (
    <div className={`my-4 ${className}`}>
      <AdUnit
        slot={AD_SLOTS.DISPLAY}
        format="auto"
        responsive={true}
        style={{ display: 'block' }}
      />
    </div>
  );
}
