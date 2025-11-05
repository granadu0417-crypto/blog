import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개 | 내 블로그',
  description: '내 블로그에 대한 소개와 운영 목적을 안내합니다.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">소개</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">블로그 소개</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            안녕하세요! 이 블로그는 다양한 주제에 대한 유용한 정보와 인사이트를 
            공유하는 공간입니다. 독자 여러분께 가치 있는 콘텐츠를 제공하기 위해 
            항상 노력하고 있습니다.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            우리는 정확하고 검증된 정보만을 다루며, 독창적인 관점과 심도 있는 
            분석을 통해 독자분들의 지식 향상에 도움을 드리고자 합니다.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">주요 콘텐츠</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>최신 트렌드 및 뉴스 분석</li>
            <li>실용적인 팁과 가이드</li>
            <li>심층 리뷰 및 비교 분석</li>
            <li>전문가 인터뷰 및 의견</li>
            <li>독자 여러분의 질문에 대한 답변</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">운영 원칙</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <ul className="space-y-3 text-gray-700">
              <li>✅ <strong>정확성</strong>: 검증된 정보만 제공합니다</li>
              <li>✅ <strong>독창성</strong>: 독자적인 관점과 분석을 제시합니다</li>
              <li>✅ <strong>유용성</strong>: 실생활에 도움이 되는 콘텐츠를 작성합니다</li>
              <li>✅ <strong>투명성</strong>: 광고와 콘텐츠를 명확히 구분합니다</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">문의하기</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            궁금하신 점이나 제안사항이 있으시면 언제든지 연락 주시기 바랍니다.
            독자 여러분의 소중한 의견을 기다리고 있습니다.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            연락처 보기
          </a>
        </section>
      </div>
    </div>
  );
}
