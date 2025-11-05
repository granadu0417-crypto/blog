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
          <h2 className="text-2xl font-bold mb-4">안녕하세요! 👋</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            이 블로그는 <strong>웹 개발, 블로그 수익화, 그리고 실용적인 정보</strong>를
            공유하기 위해 2025년 1월에 시작되었습니다.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            저는 웹 기술에 관심이 많은 블로그 운영자로, Next.js와 React를 활용한
            현대적인 웹 개발과 SEO 최적화에 특히 관심을 가지고 있습니다.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            직접 경험하고 학습한 내용을 바탕으로, 독자분들께 검증된 정보와
            실질적인 도움이 되는 콘텐츠를 제공하고자 합니다.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">블로그 운영 목표 🎯</h2>
          <div className="bg-blue-50 p-6 rounded-lg mb-6">
            <ul className="space-y-3 text-gray-700">
              <li>✅ <strong>고품질 콘텐츠</strong>: 매 게시글 최소 2,500자 이상의 심층 콘텐츠</li>
              <li>✅ <strong>실용성</strong>: 실제로 적용 가능한 정보와 가이드 제공</li>
              <li>✅ <strong>정확성</strong>: 직접 테스트하고 검증된 정보만 공유</li>
              <li>✅ <strong>지속성</strong>: 주 3-5회 정기적인 콘텐츠 업데이트</li>
              <li>✅ <strong>소통</strong>: 독자분들의 피드백을 적극 반영</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">다루는 주제 📚</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            이 블로그는 다음 10개 카테고리로 구성되어 있습니다:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">💰 금융/투자</h3>
              <p className="text-sm text-gray-600">재테크, 주식, 코인 투자 정보</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">💻 기술</h3>
              <p className="text-sm text-gray-600">웹 개발, Next.js, SEO 최적화</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">🏥 건강</h3>
              <p className="text-sm text-gray-600">건강 관리, 운동, 영양 정보</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">🏠 부동산</h3>
              <p className="text-sm text-gray-600">부동산 투자, 시장 분석</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">📚 교육</h3>
              <p className="text-sm text-gray-600">학습 방법, 자기계발</p>
            </div>
            <div className="border-l-4 border-pink-500 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">🌿 라이프스타일</h3>
              <p className="text-sm text-gray-600">일상, 취미, 생활 팁</p>
            </div>
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">✈️ 여행</h3>
              <p className="text-sm text-gray-600">여행지 추천, 여행 팁</p>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">🎨 취미</h3>
              <p className="text-sm text-gray-600">다양한 취미 활동 정보</p>
            </div>
            <div className="border-l-4 border-teal-500 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">🛍️ 쇼핑</h3>
              <p className="text-sm text-gray-600">제품 리뷰, 쇼핑 가이드</p>
            </div>
            <div className="border-l-4 border-gray-500 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">📈 트렌드</h3>
              <p className="text-sm text-gray-600">최신 트렌드 분석</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">왜 이 블로그를 시작했나요? 💡</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            인터넷에는 정보가 넘쳐나지만, <strong>정확하고 실질적인 도움이 되는
            정보</strong>를 찾기는 쉽지 않습니다. 저 역시 정보를 찾다가 불확실하거나
            오래된 정보 때문에 시간을 낭비한 경험이 많았습니다.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            그래서 저는 <strong>직접 경험하고 검증한 정보</strong>만을 공유하는
            블로그를 만들기로 결심했습니다. 특히 Next.js로 블로그를 구축하고
            SEO 최적화를 적용하며, Google AdSense 승인을 받기까지의 전 과정을
            투명하게 기록하고 있습니다.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            이 블로그는 저의 학습 과정이자, 독자분들께 도움을 드리기 위한
            플랫폼입니다. 함께 성장하고 발전하는 공간이 되기를 희망합니다.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">블로그 성장 로드맵 🚀</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4 py-2">
              <h3 className="font-bold text-green-700">1개월 목표</h3>
              <p className="text-gray-600">• 30개 고품질 게시글 작성 (각 2,500자 이상)</p>
              <p className="text-gray-600">• Google Search Console 등록 및 SEO 최적화</p>
              <p className="text-gray-600">• 일 방문자 100명 달성</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4 py-2">
              <h3 className="font-bold text-blue-700">3개월 목표</h3>
              <p className="text-gray-600">• 50개 이상 게시글 보유</p>
              <p className="text-gray-600">• Google AdSense 승인</p>
              <p className="text-gray-600">• 월 10,000명 방문자 달성</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-2">
              <h3 className="font-bold text-purple-700">6개월 목표</h3>
              <p className="text-gray-600">• 100개 이상 게시글 보유</p>
              <p className="text-gray-600">• 월 수익 50만원 이상</p>
              <p className="text-gray-600">• 주요 키워드 구글 상위 노출</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">운영 원칙 📜</h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <ul className="space-y-3 text-gray-700">
              <li>
                <strong className="text-blue-700">✅ 정확성</strong>:
                모든 정보는 직접 테스트하고 검증합니다
              </li>
              <li>
                <strong className="text-green-700">✅ 독창성</strong>:
                복사/붙여넣기가 아닌 100% 오리지널 콘텐츠만 작성합니다
              </li>
              <li>
                <strong className="text-purple-700">✅ 유용성</strong>:
                실생활에 바로 적용 가능한 실용적인 정보를 제공합니다
              </li>
              <li>
                <strong className="text-orange-700">✅ 투명성</strong>:
                광고와 콘텐츠를 명확히 구분하며, 수익화 과정을 투명하게 공개합니다
              </li>
              <li>
                <strong className="text-red-700">✅ 지속성</strong>:
                단기간이 아닌 장기적으로 가치를 제공하는 블로그를 만듭니다
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">기술 스택 ⚙️</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            이 블로그는 최신 웹 기술로 구축되어 빠른 속도와 완벽한 SEO를 자랑합니다:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Frontend</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Next.js 14 (App Router)</li>
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Content & SEO</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Markdown (gray-matter)</li>
                <li>• Dynamic Sitemap</li>
                <li>• Robots.txt</li>
                <li>• Open Graph</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Hosting</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Cloudflare Pages</li>
                <li>• 무제한 대역폭</li>
                <li>• 전세계 CDN</li>
                <li>• 자동 HTTPS</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Analytics</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Google Analytics</li>
                <li>• Google Search Console</li>
                <li>• Google AdSense (예정)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">연락하기 📬</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            궁금하신 점, 제안사항, 협업 문의 등 언제든지 연락 주시기 바랍니다.
            모든 피드백은 블로그 개선에 큰 도움이 됩니다!
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold mb-3">이메일 문의</h3>
              <p className="text-gray-700 mb-2">
                <strong>📧 granadu0417@gmail.com</strong>
              </p>
              <p className="text-sm text-gray-600">
                평일 24-48시간 이내 답변드립니다
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-bold mb-3">빠른 문의</h3>
              <a
                href="/contact"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium"
              >
                문의 양식으로 이동 →
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
