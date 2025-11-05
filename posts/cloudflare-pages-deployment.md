---
title: "Cloudflare Pages로 무료 블로그 배포하기"
date: "2025-01-13"
excerpt: "Cloudflare Pages를 활용하여 Next.js 블로그를 무료로 배포하는 방법을 단계별로 안내합니다. GitHub 연동부터 자동 배포까지 모든 과정을 다룹니다."
tags: ["Cloudflare", "배포", "Next.js", "무료호스팅"]
coverImage: "☁️"
---

# Cloudflare Pages로 무료 블로그 배포하기

Cloudflare Pages는 정적 사이트를 무료로 호스팅할 수 있는 훌륭한 서비스입니다. GitHub과 연동하면 자동 배포까지 가능해서 블로그 운영이 매우 편리합니다.

## Cloudflare Pages란?

Cloudflare Pages는 Cloudflare의 글로벌 네트워크를 활용하는 정적 사이트 호스팅 서비스입니다.

### 주요 장점

1. **완전 무료**: 무제한 대역폭과 빌드
2. **빠른 속도**: Cloudflare의 전 세계 CDN 활용
3. **자동 배포**: Git push만 하면 자동으로 배포
4. **HTTPS 기본 제공**: 무료 SSL 인증서
5. **커스텀 도메인**: 자체 도메인 연결 가능

### 지원하는 프레임워크

- Next.js
- React
- Vue
- Gatsby
- Hugo
- 그 외 다수...

## 배포 과정

### 1단계: GitHub 저장소 준비

먼저 Next.js 프로젝트를 GitHub에 올립니다:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/blog.git
git push -u origin main
```

### 2단계: Cloudflare Pages 설정

1. **Cloudflare 대시보드** 접속
2. **Workers & Pages** 메뉴 선택
3. **Create application** 클릭
4. **Pages** 탭 선택
5. **Connect to Git** 클릭

### 3단계: GitHub 연동

1. GitHub 계정 인증
2. 배포할 저장소 선택
3. 브랜치 선택 (보통 `main` 또는 `master`)

### 4단계: 빌드 설정

Next.js 프로젝트의 경우:

```yaml
Framework preset: Next.js
Build command: npm run build
Build output directory: out
```

**중요**: `next.config.js`에 다음 설정이 있어야 합니다:

```javascript
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

### 5단계: 배포 시작

**Save and Deploy** 버튼을 클릭하면 자동으로 빌드와 배포가 시작됩니다!

## 환경 변수 설정

API 키나 설정값이 필요한 경우:

1. **Settings** 탭으로 이동
2. **Environment variables** 섹션
3. **Add variable** 클릭
4. 변수명과 값 입력

```
NEXT_PUBLIC_SITE_URL=https://yourblog.pages.dev
GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
```

## 커스텀 도메인 연결

자체 도메인을 연결하려면:

1. **Custom domains** 탭 선택
2. **Set up a custom domain** 클릭
3. 도메인 입력 (예: `blog.mydomain.com`)
4. DNS 레코드 추가:
   - Type: `CNAME`
   - Name: `blog`
   - Target: `yourblog.pages.dev`

DNS 전파는 보통 몇 분에서 24시간까지 걸릴 수 있습니다.

## 자동 배포 워크플로우

이제부터는 다음과 같이 간단하게 배포할 수 있습니다:

```bash
# 1. 게시글 작성
vim posts/new-post.md

# 2. Git 커밋
git add .
git commit -m "Add new post"

# 3. GitHub에 푸시
git push

# 4. 자동 배포 시작! ✨
```

## 배포 히스토리

Cloudflare Pages는 모든 배포 히스토리를 보관합니다:

- 각 배포마다 고유 URL 제공
- 이전 버전으로 롤백 가능
- 프리뷰 URL로 변경사항 미리 확인

## 성능 최적화

### Cache 설정

Cloudflare의 강력한 캐싱 기능 활용:

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

### Analytics 연동

Cloudflare Web Analytics를 무료로 사용할 수 있습니다:

1. **Analytics** 탭 선택
2. **Web Analytics** 활성화
3. 제공되는 스크립트 태그를 `<head>`에 추가

## 문제 해결

### 빌드 실패

**로그 확인**:
1. 배포 페이지에서 **View build log** 클릭
2. 에러 메시지 확인
3. 로컬에서 `npm run build` 테스트

**일반적인 문제**:
- Node.js 버전 불일치
- 환경 변수 누락
- 의존성 설치 실패

### 404 에러

- `out` 디렉토리가 올바르게 생성되었는지 확인
- `next.config.js`의 `output: 'export'` 설정 확인
- `trailingSlash: true` 옵션 추가 고려

## 비용

Cloudflare Pages는 다음과 같이 완전 무료입니다:

- ✅ 무제한 대역폭
- ✅ 무제한 요청
- ✅ 월 500회 빌드
- ✅ 동시 1회 빌드

대부분의 개인 블로그에는 충분합니다!

## 마치며

Cloudflare Pages는 블로그 배포를 위한 최고의 선택입니다. 무료이면서도 빠르고, GitHub 연동으로 관리가 편리합니다.

지금 바로 여러분의 블로그를 Cloudflare Pages에 배포해보세요! 🚀

---

**관련 태그**: #Cloudflare #배포 #Next.js #무료호스팅
