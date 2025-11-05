'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Markdown 콘텐츠에서 헤딩 추출
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s가-힣]/g, '')
        .replace(/\s+/g, '-');

      items.push({ id, text, level });
    }

    setToc(items);
  }, [content]);

  useEffect(() => {
    // 스크롤 이벤트로 현재 섹션 감지
    const handleScroll = () => {
      const headings = document.querySelectorAll('h2, h3');
      let currentId = '';

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100 && rect.top >= -100) {
          currentId = heading.id;
        }
      });

      if (currentId) {
        setActiveId(currentId);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (toc.length === 0) return null;

  return (
    <nav className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
        📚 목차
      </h2>
      <ul className="space-y-2">
        {toc.map((item, index) => (
          <li
            key={index}
            className={`${
              item.level === 3 ? 'ml-4' : ''
            }`}
          >
            <button
              onClick={() => handleClick(item.id)}
              className={`
                text-left w-full px-3 py-2 rounded transition-all
                ${activeId === item.id
                  ? 'bg-blue-200 text-blue-900 font-semibold'
                  : 'text-blue-700 hover:bg-blue-100'
                }
                ${item.level === 2 ? 'text-base' : 'text-sm'}
              `}
            >
              {item.level === 3 && '→ '}
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
