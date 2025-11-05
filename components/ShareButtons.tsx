'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // 현재 URL 생성 (배포 후에는 실제 도메인으로 변경)
  const getUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/posts/${slug}`;
    }
    return '';
  };

  // Twitter 공유
  const shareToTwitter = () => {
    const url = getUrl();
    const text = encodeURIComponent(title);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  // Facebook 공유
  const shareToFacebook = () => {
    const url = getUrl();
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  // URL 복사
  const copyUrl = async () => {
    const url = getUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('URL 복사 실패:', err);
      // Fallback: 직접 선택 및 복사
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="border-t pt-8">
      <h3 className="text-xl font-bold mb-4">이 글을 공유하세요</h3>
      <div className="flex flex-wrap gap-3">
        {/* Twitter 공유 */}
        <button
          onClick={shareToTwitter}
          className="bg-[#1DA1F2] text-white px-6 py-3 rounded-lg hover:bg-[#1a8cd8] transition font-medium flex items-center gap-2"
          aria-label="Twitter로 공유"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
          </svg>
          Twitter
        </button>

        {/* Facebook 공유 */}
        <button
          onClick={shareToFacebook}
          className="bg-[#4267B2] text-white px-6 py-3 rounded-lg hover:bg-[#365899] transition font-medium flex items-center gap-2"
          aria-label="Facebook으로 공유"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>

        {/* URL 복사 */}
        <button
          onClick={copyUrl}
          className={`
            px-6 py-3 rounded-lg font-medium transition flex items-center gap-2
            ${copied
              ? 'bg-green-600 text-white'
              : 'bg-gray-600 text-white hover:bg-gray-700'
            }
          `}
          aria-label="URL 복사"
        >
          {copied ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              복사 완료!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              URL 복사
            </>
          )}
        </button>
      </div>

      {/* 카카오톡 안내 (선택사항) */}
      <p className="text-sm text-gray-500 mt-4">
        💡 카카오톡으로 공유하려면 <strong>URL 복사</strong> 버튼을 클릭한 후 카카오톡에 붙여넣기 해주세요.
      </p>
    </div>
  );
}
