'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
}

/**
 * FAQ 섹션 UI 컴포넌트
 * 아코디언 스타일의 FAQ를 렌더링합니다.
 */
export default function FAQSection({ items, title = '자주 묻는 질문' }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (items.length === 0) return null;

  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span>💬</span> {title}
      </h2>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-5 py-4 text-left bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-white transition-all flex justify-between items-center gap-4"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-gray-800 flex-1">
                <span className="text-blue-600 mr-2">Q.</span>
                {item.question}
              </span>
              <span
                className={`text-gray-400 transform transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? 'max-h-[500px] opacity-100'
                  : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="px-5 py-4 bg-white border-t border-gray-100">
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold text-green-600 mr-2">A.</span>
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// FAQ 아이템 타입 export
export type { FAQItem };
