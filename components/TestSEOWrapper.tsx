import { QuizSchema, FAQSchema } from './StructuredData';
import { getTestSEOData, type TestSEOData } from '@/lib/test-seo-data';

interface TestSEOWrapperProps {
  slug: string;
  children: React.ReactNode;
}

/**
 * 테스트 페이지 SEO 래퍼 컴포넌트
 *
 * 크롤러가 읽을 수 있는 정적 콘텐츠와 구조화 데이터를 제공합니다.
 */
export function TestSEOWrapper({ slug, children }: TestSEOWrapperProps) {
  const testData = getTestSEOData(slug);

  if (!testData) {
    return <>{children}</>;
  }

  const baseUrl = 'https://kimyido.com';
  const testUrl = `${baseUrl}/tests/${slug}/`;

  return (
    <>
      {/* 구조화 데이터 (JSON-LD) */}
      <QuizSchema
        name={testData.name}
        description={testData.description}
        url={testUrl}
        about={testData.about}
      />
      <FAQSchema faqs={testData.faqs} />

      {/*
        SEO 참고: 숨긴 텍스트(sr-only)로 크롤러용 콘텐츠를 넣는 것은
        검색엔진 가이드라인 위반 가능성이 있어 제거함.
        대신 JSON-LD 구조화 데이터와 하단의 보이는 콘텐츠로 SEO 처리.
      */}

      {/* 실제 테스트 UI (Client Component) */}
      {children}

      {/* 하단 SEO 콘텐츠 - 사용자에게도 보임 */}
      <section className="mt-12 pt-8 border-t border-gray-200 max-w-2xl mx-auto px-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          {testData.name}란?
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {testData.guideContent}
        </p>

        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          자주 묻는 질문
        </h3>
        <div className="space-y-4 mb-8">
          {testData.faqs.map((faq, index) => (
            <details key={index} className="group">
              <summary className="cursor-pointer font-medium text-gray-700 hover:text-purple-600 list-none flex items-center">
                <span className="mr-2 text-purple-500 group-open:rotate-90 transition-transform">▶</span>
                {faq.question}
              </summary>
              <p className="mt-2 ml-6 text-gray-600 text-sm">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <p className="text-xs text-gray-400 text-center">
          * 본 테스트는 재미를 위한 콘텐츠이며, 실제 점술이나 예언과는 무관합니다.
        </p>
      </section>
    </>
  );
}

/**
 * 테스트 페이지 메타데이터 생성 헬퍼
 */
export function generateTestMetadata(slug: string) {
  const testData = getTestSEOData(slug);

  if (!testData) {
    return {
      title: '테스트',
      description: '재미있는 테스트',
    };
  }

  const baseUrl = 'https://kimyido.com';

  return {
    title: testData.title,
    description: testData.description,
    keywords: testData.keywords,
    openGraph: {
      title: testData.title,
      description: testData.description,
      url: `${baseUrl}/tests/${slug}/`,
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title: testData.title,
      description: testData.description,
    },
    alternates: {
      canonical: `${baseUrl}/tests/${slug}/`,
    },
  };
}
