/**
 * 게시글 자동 생성 스크립트
 * 
 * 사용법:
 * npx ts-node scripts/generate-post.ts
 * 
 * 또는 package.json에 스크립트 추가:
 * "generate-post": "ts-node scripts/generate-post.ts"
 */

import * as fs from 'fs';
import * as path from 'path';
import { getImageForPost, generateImageCredit, ImageResult } from '../lib/imageService';
import { CATEGORIES } from '../lib/categories';

interface PostTemplate {
  category: string;
  title: string;
  tags: string[];
  keywords?: string;
}

/**
 * 게시글 템플릿 생성
 */
function generatePostContent(
  template: PostTemplate,
  image: ImageResult | null
): string {
  const today = new Date().toISOString().split('T')[0];
  
  const frontMatter = `---
title: "${template.title}"
date: "${today}"
excerpt: "${template.title}에 대한 유용한 정보와 팁을 공유합니다."
category: "${template.category}"
tags: ${JSON.stringify(template.tags)}
${image ? `imageUrl: "${image.url}"` : ''}
${image ? `coverImage: "📷"` : ''}
author: "블로그 관리자"
---

# ${template.title}

${image ? `![${image.alt}](${image.url})\n${generateImageCredit(image)}\n` : ''}

## 소개

이 글에서는 ${template.title}에 대해 자세히 알아보겠습니다.

## 주요 내용

### 1. 첫 번째 포인트

여기에 첫 번째 주요 내용을 작성하세요.

- 요점 1
- 요점 2
- 요점 3

### 2. 두 번째 포인트

두 번째 주요 내용을 작성합니다.

\`\`\`
// 필요한 경우 코드 예제를 추가하세요
\`\`\`

### 3. 세 번째 포인트

세 번째 주요 내용입니다.

## 실전 팁

실제로 적용할 수 있는 유용한 팁:

1. **팁 1**: 구체적인 팁 설명
2. **팁 2**: 또 다른 유용한 팁
3. **팁 3**: 마지막 팁

## 결론

${template.title}에 대해 알아보았습니다. 이 정보가 도움이 되었기를 바랍니다.

## 자주 묻는 질문 (FAQ)

### Q1: 궁금한 점이 있나요?

A: 여기에 답변을 작성하세요.

### Q2: 또 다른 질문은?

A: 답변을 추가하세요.

---

**관련 글**: 다른 유용한 게시글도 확인해보세요!
`;

  return frontMatter;
}

/**
 * 게시글 파일 생성
 */
async function createPost(template: PostTemplate) {
  try {
    console.log(`\n📝 게시글 생성 중: ${template.title}`);
    
    // 이미지 가져오기
    console.log(`🖼️  이미지 검색 중...`);
    const image = await getImageForPost(
      template.title,
      template.category,
      template.tags
    );

    if (image) {
      console.log(`✅ 이미지 찾음: ${image.alt} (출처: ${image.source})`);
    } else {
      console.log(`⚠️  이미지를 찾을 수 없습니다. 기본 이미지를 사용합니다.`);
    }

    // 게시글 내용 생성
    const content = generatePostContent(template, image);

    // 파일명 생성 (제목을 kebab-case로 변환)
    const fileName = template.title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    // 카테고리 폴더 확인/생성
    const categoryDir = path.join(process.cwd(), 'posts', template.category);
    if (!fs.existsSync(categoryDir)) {
      fs.mkdirSync(categoryDir, { recursive: true });
      console.log(`📁 카테고리 폴더 생성: ${categoryDir}`);
    }

    // 파일 경로
    const filePath = path.join(categoryDir, `${fileName}.md`);

    // 파일이 이미 존재하는지 확인
    if (fs.existsSync(filePath)) {
      console.log(`⚠️  파일이 이미 존재합니다: ${filePath}`);
      return;
    }

    // 파일 저장
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ 게시글 생성 완료: ${filePath}`);

  } catch (error) {
    console.error(`❌ 게시글 생성 실패:`, error);
  }
}

/**
 * 카테고리별 샘플 게시글 템플릿
 */
const POST_TEMPLATES: Record<string, PostTemplate[]> = {
  finance: [
    {
      category: 'finance',
      title: '2025년 초보자를 위한 주식 투자 가이드',
      tags: ['주식', '투자', '초보자', '재테크'],
    },
    {
      category: 'finance',
      title: '월급쟁이 재테크 방법 TOP 10',
      tags: ['재테크', '저축', '투자', '월급'],
    },
  ],
  tech: [
    {
      category: 'tech',
      title: 'ChatGPT 활용법 완벽 가이드',
      tags: ['AI', 'ChatGPT', '인공지능', '활용법'],
    },
    {
      category: 'tech',
      title: '프로그래밍 독학 로드맵 2025',
      tags: ['프로그래밍', '코딩', '독학', '개발자'],
    },
  ],
  health: [
    {
      category: 'health',
      title: '집에서 할 수 있는 홈트레이닝 루틴',
      tags: ['운동', '홈트', '다이어트', '건강'],
    },
    {
      category: 'health',
      title: '건강한 다이어트를 위한 식단 가이드',
      tags: ['다이어트', '식단', '영양', '건강'],
    },
  ],
  lifestyle: [
    {
      category: 'lifestyle',
      title: '미니멀 라이프 실천하는 10가지 방법',
      tags: ['미니멀', '라이프스타일', '정리', '꿀팁'],
    },
  ],
  travel: [
    {
      category: 'travel',
      title: '제주도 숨은 맛집 베스트 10',
      tags: ['제주도', '맛집', '여행', '추천'],
    },
  ],
};

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('🚀 게시글 자동 생성 스크립트 시작\n');
  console.log('📋 사용 가능한 카테고리:');
  Object.keys(CATEGORIES).forEach((id) => {
    const category = CATEGORIES[id];
    console.log(`  - ${category.icon} ${category.name} (${id})`);
  });

  console.log('\n💡 템플릿을 수정하려면 scripts/generate-post.ts 파일을 편집하세요.\n');

  // 각 카테고리별로 게시글 생성
  for (const [categoryId, templates] of Object.entries(POST_TEMPLATES)) {
    console.log(`\n📂 카테고리: ${CATEGORIES[categoryId]?.name || categoryId}`);
    
    for (const template of templates) {
      await createPost(template);
      // API 호출 제한을 피하기 위해 약간의 지연
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  console.log('\n✅ 모든 게시글 생성 완료!');
  console.log('💡 생성된 게시글을 확인하고 내용을 편집하세요.');
}

// 스크립트 실행
main().catch(console.error);
