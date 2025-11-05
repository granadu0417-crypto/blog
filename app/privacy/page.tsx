import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | 내 블로그',
  description: '내 블로그의 개인정보 처리 방침입니다.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">개인정보처리방침</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">
          최종 수정일: 2025년 1월 1일
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. 수집하는 개인정보</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            본 블로그는 다음과 같은 개인정보를 수집할 수 있습니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>이메일 주소 (문의 및 구독 시)</li>
            <li>이름 (선택사항)</li>
            <li>쿠키 및 방문 기록 (Google Analytics)</li>
            <li>IP 주소 (자동 수집)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. 개인정보의 이용 목적</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            수집된 개인정보는 다음의 목적으로 이용됩니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>문의사항에 대한 답변 제공</li>
            <li>블로그 콘텐츠 및 서비스 개선</li>
            <li>통계 분석 및 트래픽 분석</li>
            <li>마케팅 및 광고 목적 (동의한 경우)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. 쿠키 사용</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            본 블로그는 사용자 경험 개선을 위해 쿠키를 사용합니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>필수 쿠키</strong>: 웹사이트 기본 기능 제공</li>
            <li><strong>분석 쿠키</strong>: Google Analytics를 통한 방문자 분석</li>
            <li><strong>광고 쿠키</strong>: Google AdSense 맞춤 광고 제공</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            브라우저 설정을 통해 쿠키를 거부할 수 있으나, 일부 서비스 이용에 
            제한이 있을 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. 제3자 제공</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            본 블로그는 다음의 경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>사용자의 동의가 있는 경우</li>
            <li>법률에 의해 요구되는 경우</li>
            <li>서비스 제공을 위해 필요한 경우 (Google Analytics, Google AdSense 등)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. Google AdSense</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            본 블로그는 Google AdSense를 통해 광고를 게재합니다. Google은 사용자의 
            관심사에 맞는 광고를 제공하기 위해 쿠키를 사용할 수 있습니다.
          </p>
          <p className="text-gray-700 leading-relaxed">
            맞춤 광고 설정은 <a href="https://www.google.com/settings/ads" 
            className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            Google 광고 설정</a>에서 변경할 수 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. 보안</h2>
          <p className="text-gray-700 leading-relaxed">
            본 블로그는 개인정보를 안전하게 관리하기 위해 기술적, 관리적 보호조치를 
            취하고 있습니다. 그러나 인터넷을 통한 전송의 완전한 보안은 보장할 수 없습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. 사용자 권리</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            사용자는 언제든지 다음의 권리를 행사할 수 있습니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>개인정보 열람 요구</li>
            <li>개인정보 정정 및 삭제 요구</li>
            <li>개인정보 처리 정지 요구</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. 방침 변경</h2>
          <p className="text-gray-700 leading-relaxed">
            본 개인정보처리방침은 관련 법령 및 지침의 변경, 또는 내부 방침 변경에 
            따라 수정될 수 있습니다. 변경 시 웹사이트를 통해 공지합니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">9. 문의</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            개인정보 처리에 관한 문의사항이 있으시면 아래로 연락주시기 바랍니다:
          </p>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong>이메일:</strong> privacy@myblog.com<br />
              <strong>담당자:</strong> 개인정보 보호책임자
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
