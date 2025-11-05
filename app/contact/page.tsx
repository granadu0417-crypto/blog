import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '연락처 | 내 블로그',
  description: '문의사항이나 제안이 있으시면 연락주세요.',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">연락처</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">문의하기</h2>
          <p className="text-gray-700 mb-6">
            궁금하신 점이나 제안사항이 있으시면 아래 연락처로 문의해주세요.
            최대한 빠르게 답변드리겠습니다.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">📧</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">이메일</h3>
                <p className="text-gray-600">contact@myblog.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">💬</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">소셜 미디어</h3>
                <p className="text-gray-600">Twitter: @myblog</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">⏰</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">응답 시간</h3>
                <p className="text-gray-600">평일 24-48시간 이내</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">메시지 보내기</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                이름
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="홍길동"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                메시지
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="문의 내용을 입력해주세요..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              보내기
            </button>
          </form>
          
          <p className="text-sm text-gray-500 mt-4">
            * 현재 이 양식은 데모용입니다. 실제 이메일 전송을 위해서는 
            백엔드 연동이 필요합니다.
          </p>
        </div>
      </div>
    </div>
  );
}
