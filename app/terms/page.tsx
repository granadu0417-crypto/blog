import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 | 내 블로그',
  description: '내 블로그의 이용약관입니다.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">이용약관</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-8">
          최종 수정일: 2025년 1월 1일
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">1. 약관의 목적</h2>
          <p className="text-gray-700 leading-relaxed">
            본 약관은 내 블로그(이하 "블로그")가 제공하는 모든 서비스(이하 "서비스")의 
            이용과 관련하여 블로그와 이용자 간의 권리, 의무 및 책임사항을 규정함을 
            목적으로 합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">2. 약관의 효력 및 변경</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            본 약관은 블로그를 통해 공지함으로써 효력이 발생합니다. 블로그는 필요한 
            경우 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있으며, 
            변경된 약관은 공지 후 7일이 경과한 시점부터 효력이 발생합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">3. 서비스의 제공</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            블로그가 제공하는 서비스는 다음과 같습니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>블로그 콘텐츠 열람 서비스</li>
            <li>댓글 및 소통 서비스</li>
            <li>뉴스레터 구독 서비스</li>
            <li>기타 블로그가 추가 개발하거나 제휴를 통해 제공하는 서비스</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">4. 서비스 이용</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            서비스는 연중무휴 1일 24시간 제공함을 원칙으로 합니다. 다만, 다음의 
            경우 서비스 제공이 일시 중단될 수 있습니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>시스템 정기점검, 서버의 증설 및 교체</li>
            <li>서비스 설비의 장애 또는 서비스 이용의 폭주</li>
            <li>기타 불가항력적 사유</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">5. 이용자의 의무</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            이용자는 다음 행위를 해서는 안 됩니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>타인의 개인정보를 도용하거나 부정하게 사용하는 행위</li>
            <li>블로그의 서비스를 이용하여 얻은 정보를 무단으로 복제, 유통하는 행위</li>
            <li>타인의 명예를 손상시키거나 불이익을 주는 행위</li>
            <li>음란물을 게재하거나 음란사이트를 연결하는 행위</li>
            <li>해킹 및 컴퓨터 바이러스 유포 행위</li>
            <li>타인의 의사에 반하여 광고성 정보를 지속적으로 전송하는 행위</li>
            <li>서비스의 안정적인 운영에 지장을 주는 행위</li>
            <li>관련 법령에 위배되는 행위</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">6. 저작권</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            블로그가 작성한 저작물에 대한 저작권 및 기타 지적재산권은 블로그에 
            귀속됩니다. 이용자는 블로그가 제공하는 서비스를 이용함으로써 얻은 
            정보를 블로그의 사전 승낙 없이 복제, 전송, 출판, 배포, 방송 등 
            기타 방법으로 이용하거나 제3자에게 이용하게 해서는 안 됩니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">7. 면책조항</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            블로그는 다음의 경우 책임을 지지 않습니다:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>천재지변 또는 이에 준하는 불가항력으로 인해 서비스를 제공할 수 없는 경우</li>
            <li>이용자의 귀책사유로 인한 서비스 이용 장애</li>
            <li>서비스를 통해 게재된 정보, 자료, 사실의 정확성, 신뢰성</li>
            <li>이용자 간 또는 이용자와 제3자 간 서비스를 매개로 발생한 분쟁</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">8. 광고 게재</h2>
          <p className="text-gray-700 leading-relaxed">
            블로그는 서비스 운영을 위해 Google AdSense 등의 광고를 게재할 수 있습니다. 
            광고 내용에 대한 책임은 광고주에게 있으며, 블로그는 이용자가 광고를 
            통해 이루어진 거래에 대해 책임을 지지 않습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">9. 준거법 및 관할법원</h2>
          <p className="text-gray-700 leading-relaxed">
            본 약관은 대한민국 법률에 따라 규율되고 해석됩니다. 서비스 이용과 
            관련하여 분쟁이 발생한 경우, 관할법원은 민사소송법에 따른 관할법원으로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">10. 문의</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            본 약관에 관한 문의사항이 있으시면 아래로 연락주시기 바랍니다:
          </p>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700">
              <strong>이메일:</strong> contact@myblog.com<br />
              <strong>담당자:</strong> 고객지원팀
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
