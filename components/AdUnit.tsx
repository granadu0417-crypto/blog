'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal' | 'autorelaxed';
  layout?: string;
  layoutKey?: string;
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const PUBLISHER_ID = 'ca-pub-3591490977493759';

export default function AdUnit({
  slot,
  format = 'auto',
  layout,
  layoutKey,
  responsive = true,
  className = '',
  style,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    if (isAdLoaded.current) return;

    try {
      if (typeof window !== 'undefined' && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      }
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className={`adsbygoogle ${className}`}
      style={style || { display: 'block' }}
      data-ad-client={PUBLISHER_ID}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? 'true' : 'false'}
      {...(layout && { 'data-ad-layout': layout })}
      {...(layoutKey && { 'data-ad-layout-key': layoutKey })}
    />
  );
}

// 광고 슬롯 상수
export const AD_SLOTS = {
  DISPLAY: '2795943827',
  IN_ARTICLE: '9169780487',
  MULTIPLEX: '8686580665',
} as const;
