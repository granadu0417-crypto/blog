import { WebApplicationSchema, FAQSchema } from './StructuredData';
import { getToolSEOData, type ToolSEOData } from '@/lib/tool-seo-data';
import Link from 'next/link';

interface ToolSEOWrapperProps {
  slug: string;
  children: React.ReactNode;
}

/**
 * 도구 페이지 SEO 래퍼 컴포넌트
 *
 * 크롤러가 읽을 수 있는 정적 콘텐츠와 구조화 데이터를 제공합니다.
 * - Server Component로 렌더링되어 HTML에 직접 포함
 * - 네이버/구글 크롤러가 콘텐츠를 인식할 수 있음
 */
export function ToolSEOWrapper({ slug, children }: ToolSEOWrapperProps) {
  const toolData = getToolSEOData(slug);

  if (!toolData) {
    return <>{children}</>;
  }

  const baseUrl = 'https://kimyido.com';
  const toolUrl = `${baseUrl}/tools/${slug}/`;

  return (
    <>
      {/* 구조화 데이터 (JSON-LD) */}
      <WebApplicationSchema
        name={toolData.name}
        description={toolData.description}
        url={toolUrl}
        applicationCategory={toolData.category}
      />
      <FAQSchema faqs={toolData.faqs} />

      {/*
        SEO 참고: 숨긴 텍스트(sr-only)로 크롤러용 콘텐츠를 넣는 것은
        검색엔진 가이드라인 위반 가능성이 있어 제거함.
        대신 JSON-LD 구조화 데이터와 하단의 보이는 콘텐츠로 SEO 처리.
      */}

      {/* 실제 도구 UI (Client Component) */}
      {children}

      {/* 하단 SEO 콘텐츠 - 사용자에게도 보임 */}
      <section className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {toolData.name} 사용법
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {toolData.guideContent}
        </p>

        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          자주 묻는 질문
        </h3>
        <div className="space-y-4">
          {toolData.faqs.map((faq, index) => (
            <details key={index} className="group">
              <summary className="cursor-pointer font-medium text-gray-700 hover:text-blue-600 list-none flex items-center">
                <span className="mr-2 text-blue-500 group-open:rotate-90 transition-transform">▶</span>
                {faq.question}
              </summary>
              <p className="mt-2 ml-6 text-gray-600 text-sm">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {toolData.relatedTools.length > 0 && (
          <>
            <h3 className="text-lg font-semibold mt-6 mb-3 text-gray-800">
              관련 도구
            </h3>
            <div className="flex flex-wrap gap-2">
              {toolData.relatedTools.map((relatedSlug) => {
                const relatedData = getToolSEOData(relatedSlug);
                return relatedData ? (
                  <Link
                    key={relatedSlug}
                    href={`/tools/${relatedSlug}/`}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 rounded-full text-sm transition-colors"
                  >
                    {relatedData.name}
                  </Link>
                ) : null;
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
}

/**
 * 도구 페이지 메타데이터 생성 헬퍼
 */
export function generateToolMetadata(slug: string) {
  const toolData = getToolSEOData(slug);

  if (!toolData) {
    return {
      title: '도구',
      description: '유용한 온라인 도구',
    };
  }

  const baseUrl = 'https://kimyido.com';

  return {
    title: toolData.title,
    description: toolData.description,
    keywords: toolData.keywords,
    openGraph: {
      title: toolData.title,
      description: toolData.description,
      url: `${baseUrl}/tools/${slug}/`,
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: toolData.title,
      description: toolData.description,
    },
    alternates: {
      canonical: `${baseUrl}/tools/${slug}/`,
    },
  };
}
