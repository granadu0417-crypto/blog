# 📝 SEO 최적화 블로그

Next.js와 Markdown으로 제작된 SEO 최적화 블로그입니다. Cloudflare Pages에 배포하여 빠른 속도와 무료 호스팅의 이점을 누릴 수 있습니다.

## ✨ 주요 기능

- ✅ **SEO 최적화**: 메타태그, sitemap, robots.txt 자동 생성
- ✅ **Markdown 기반**: 쉽고 빠른 콘텐츠 작성
- ✅ **반응형 디자인**: 모든 디바이스에서 완벽하게 작동
- ✅ **구글 애즈 준비**: 필수 페이지(소개, 연락처, 개인정보처리방침, 이용약관) 포함
- ✅ **해시태그 시스템**: 태그별 게시글 분류
- ✅ **빠른 로딩**: Next.js SSG로 정적 페이지 생성

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 빌드

```bash
npm run build
```

정적 파일이 `out` 폴더에 생성됩니다.

## 📝 새 게시글 작성하기

1. `posts` 폴더에 새 `.md` 파일 생성
2. Front Matter 작성:

```markdown
---
title: "게시글 제목"
date: "2025-01-15"
excerpt: "게시글 요약 (200자 이내)"
tags: ["태그1", "태그2", "태그3"]
coverImage: "🚀"
---

# 게시글 제목

여기에 본문 내용을 작성하세요...
```

3. Git에 커밋하고 푸시하면 자동 배포!

```bash
git add .
git commit -m "Add new post"
git push
```

## 📁 프로젝트 구조

```
blog/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 공통 레이아웃
│   ├── page.tsx           # 메인 페이지
│   ├── posts/
│   │   └── [slug]/
│   │       └── page.tsx   # 게시글 상세 페이지
│   ├── about/             # 소개 페이지
│   ├── contact/           # 연락처 페이지
│   ├── privacy/           # 개인정보처리방침
│   └── terms/             # 이용약관
├── posts/                  # Markdown 게시글
│   ├── post-1.md
│   └── post-2.md
├── lib/
│   └── posts.ts           # 게시글 처리 로직
├── public/                 # 정적 파일
│   └── robots.txt
└── package.json
```

## 🌐 Cloudflare Pages 배포

### 초기 설정

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) 접속
2. **Workers & Pages** → **Create application**
3. **Pages** → **Connect to Git**
4. GitHub 저장소 선택
5. 빌드 설정:
   - Framework preset: `Next.js`
   - Build command: `npm run build`
   - Build output directory: `out`

### 자동 배포

이제부터는 `main` 브랜치에 푸시하면 자동으로 배포됩니다!

```bash
git push origin main
```

## 🎨 커스터마이징

### 블로그 제목 및 설명 수정

`app/layout.tsx` 파일에서 메타데이터를 수정하세요:

```typescript
export const metadata: Metadata = {
  title: "내 블로그 제목",
  description: "블로그 설명",
  // ...
};
```

### 색상 및 디자인 변경

Tailwind CSS를 사용하므로 `tailwind.config.js`에서 테마를 커스터마이징할 수 있습니다.

### 연락처 정보 수정

다음 파일들에서 연락처 정보를 업데이트하세요:
- `app/layout.tsx` (푸터)
- `app/contact/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`

## 📊 구글 애즈 설정

### 1. 필수 페이지 확인

다음 페이지들이 이미 포함되어 있습니다:
- ✅ 소개 (`/about`)
- ✅ 연락처 (`/contact`)
- ✅ 개인정보처리방침 (`/privacy`)
- ✅ 이용약관 (`/terms`)

### 2. 콘텐츠 작성

구글 애즈 승인을 받으려면:
- 최소 20-30개의 고품질 게시글
- 각 게시글 1000자 이상
- 독창적이고 유용한 콘텐츠

### 3. 애즈 코드 삽입

승인 후 `app/layout.tsx`에 애즈 코드를 추가하세요:

```typescript
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXX"
     crossOrigin="anonymous"></script>
```

## 🔍 SEO 최적화 팁

### Google Search Console 등록

1. [Google Search Console](https://search.google.com/search-console/) 접속
2. 도메인 추가
3. `sitemap.xml` 제출

### 메타태그 최적화

각 게시글의 Front Matter에서 `title`, `excerpt`, `tags`를 신중하게 작성하세요.

### 이미지 최적화

- 적절한 Alt 텍스트 사용
- WebP 형식 사용
- 파일 크기 최적화

## 🛠️ 기술 스택

- **Next.js 14**: React 프레임워크
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 유틸리티 CSS
- **gray-matter**: Markdown Front Matter 파싱
- **remark**: Markdown을 HTML로 변환
- **Cloudflare Pages**: 호스팅

## 📝 라이선스

MIT License

## 🤝 기여

이슈나 풀 리퀘스트는 언제나 환영합니다!

## 📞 지원

문제가 있거나 질문이 있으시면 [이슈](https://github.com/yourusername/blog/issues)를 등록해주세요.

---

**Happy Blogging! 🎉**
