# 배포 및 확인 가이드

> kimyido.com 블로그 배포 후 반드시 확인해야 할 사항들

---

## ⚠️ 중요: 캐시 문제

### 문제점
배포 후 변경사항이 반영되지 않은 것처럼 보이는 이유:
- **브라우저 캐시**: 이전 버전의 HTML/CSS/JS 파일이 저장되어 있음
- **Cloudflare CDN 캐시**: 전 세계 엣지 서버에 이전 버전이 캐싱됨
- **쿠키**: 이전 세션 정보가 남아있음

### 해결 방법

#### 1️⃣ 시크릿 모드 (가장 확실)
**추천 ⭐**: 배포 후 항상 시크릿 모드로 먼저 확인!

- **Chrome/Edge**: `Ctrl + Shift + N` (Windows) / `Cmd + Shift + N` (Mac)
- **Firefox**: `Ctrl + Shift + P` (Windows) / `Cmd + Shift + P` (Mac)
- **Safari**: `Cmd + Shift + N` (Mac)

**장점**:
- 캐시 없이 완전히 새로 로드
- 쿠키 없음
- 배포 결과를 정확하게 확인 가능

#### 2️⃣ 하드 리프레시 (빠른 방법)
일반 모드에서 캐시 무시하고 새로고침:

- **Chrome/Edge/Firefox**: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac)
- **Safari**: `Cmd + Option + R` (Mac)

**또는**:
- 개발자 도구 열기 (`F12`)
- 새로고침 버튼 **우클릭** → **"캐시 비우기 및 강력 새로고침"** 선택

#### 3️⃣ 캐시 완전 삭제
브라우저 설정에서 캐시 삭제:

**Chrome/Edge**:
1. `Ctrl + Shift + Delete`
2. **"쿠키 및 기타 사이트 데이터"** 체크
3. **"캐시된 이미지 및 파일"** 체크
4. 기간: **"전체 기간"** 선택
5. **"데이터 삭제"** 클릭

**Firefox**:
1. `Ctrl + Shift + Delete`
2. **"쿠키"** 체크
3. **"캐시"** 체크
4. 기간: **"전체"** 선택
5. **"지금 삭제"** 클릭

#### 4️⃣ Cloudflare 캐시 퍼지 (선택사항)
전 세계 CDN 캐시를 강제로 삭제:

1. **Cloudflare 대시보드** → **kimyido.com**
2. 왼쪽 메뉴 → **"캐싱" (Caching)**
3. **"캐시 구성" (Configuration)**
4. **"모두 제거" (Purge Everything)** 클릭

**주의**: 전 세계 사용자에게 영향을 주므로 꼭 필요할 때만 사용

---

## 🚀 배포 워크플로우

### 표준 배포 프로세스

```bash
# 1. 로컬 빌드 테스트
npm run build

# 2. Git에 커밋
git add -A
git commit -m "feat: 설명"

# 3. GitHub에 푸시
git push origin main

# 4. Cloudflare Pages 자동 배포 (1-2분)
# 배포 완료 대기...

# 5. 시크릿 모드로 확인 (Ctrl+Shift+N)
# https://kimyido.com 접속
```

### 배포 확인 체크리스트

#### ✅ 기본 확인 사항
```
[ ] 시크릿 모드로 열기 (Ctrl+Shift+N)
[ ] 홈페이지 정상 로드 (https://kimyido.com)
[ ] 새 게시글이 목록에 보이는가?
[ ] 게시글 클릭 시 정상 열리는가?
[ ] 이미지가 모두 로드되는가?
[ ] 스타일(CSS)이 정상 적용되는가?
[ ] 모바일 반응형 확인 (F12 → 모바일 뷰)
```

#### ✅ SEO 확인 사항
```
[ ] robots.txt 확인 (https://kimyido.com/robots.txt)
[ ] sitemap.xml 확인 (https://kimyido.com/sitemap.xml)
[ ] RSS 피드 확인 (https://kimyido.com/rss.xml)
[ ] Open Graph 메타 태그 (F12 → Elements → <head>)
[ ] 구조화된 데이터 (페이지 소스 → <script type="application/ld+json">)
```

#### ✅ 기능 확인 사항
```
[ ] 좋아요 버튼 작동
[ ] 공유 버튼 작동 (트위터, 페이스북, URL 복사)
[ ] 목차(TOC) 클릭 시 이동
[ ] 태그 클릭 시 태그 페이지 이동
[ ] 카테고리 클릭 시 카테고리 페이지 이동
[ ] 내부 링크 정상 작동
```

#### ✅ 성능 확인 사항
```
[ ] 페이지 로드 속도 (3초 이내)
[ ] Lighthouse 점수 확인 (F12 → Lighthouse)
  - Performance: 90+ 목표
  - SEO: 95+ 목표
  - Accessibility: 90+ 목표
  - Best Practices: 90+ 목표
```

---

## 🔧 문제 해결

### 문제: 변경사항이 보이지 않음

**증상**:
- 배포했는데 새 게시글이 안 보임
- CSS 변경이 반영 안됨
- 이미지가 이전 버전

**해결 순서**:
1. **시크릿 모드로 확인** (Ctrl+Shift+N)
   - 보이면: 캐시 문제 → 하드 리프레시
   - 안 보이면: 배포 문제 → 아래 계속

2. **Cloudflare Pages 배포 상태 확인**
   - https://dash.cloudflare.com → Workers & Pages
   - blog-7xx 프로젝트 → 최근 배포 확인
   - 상태: "Success" 확인
   - 배포 시간 확인 (최근인가?)

3. **GitHub Actions 확인**
   - https://github.com/granadu0417-crypto/blog/actions
   - 최근 워크플로우 상태 확인
   - 실패 시 에러 로그 확인

4. **빌드 에러 확인**
   - 로컬에서 `npm run build` 실행
   - 에러 없이 성공하는지 확인

### 문제: 404 에러

**증상**:
- 새 페이지에 접속하면 404
- 태그/카테고리 페이지가 안 보임

**해결 방법**:
1. `npm run build` 로컬 빌드 확인
2. 빌드 결과에 해당 페이지가 생성되었는지 확인
3. 동적 라우트 문제일 수 있음 → `generateStaticParams` 확인
4. 재배포

### 문제: 스타일이 깨짐

**증상**:
- 레이아웃이 이상함
- CSS가 적용 안됨

**해결 방법**:
1. **하드 리프레시** (Ctrl+Shift+R)
2. **CSS 파일 캐시 문제**
   - F12 → Network 탭
   - CSS 파일 확인 (200 OK인지, 304 Not Modified인지)
   - 304면 캐시 문제 → 시크릿 모드 확인
3. **Tailwind 빌드 문제**
   - `npm run build` 재실행
   - `tailwind.config.js` 확인

### 문제: 이미지가 안 보임

**증상**:
- 이미지가 깨진 아이콘으로 표시
- 외부 이미지(Unsplash 등)가 안 보임

**해결 방법**:
1. **이미지 URL 확인**
   - F12 → Network 탭
   - 이미지 URL 확인 (404인지?)
2. **외부 이미지 도메인 허용**
   - `next.config.js` → `images.remotePatterns` 확인
3. **CORS 문제**
   - 외부 이미지가 CORS를 허용하는지 확인

---

## 📊 배포 후 모니터링

### 즉시 확인 (배포 후 5분 이내)
```
✅ 사이트 접속 가능 여부
✅ 새 콘텐츠 반영 확인
✅ 에러 없이 정상 작동
✅ 모바일에서 확인
```

### 단기 확인 (배포 후 1시간 이내)
```
✅ Cloudflare Analytics 확인
✅ 방문자 통계
✅ 에러 로그 확인
```

### 중기 확인 (배포 후 1-2일)
```
✅ Google Search Console 크롤링 에러 확인
✅ 네이버 웹마스터 수집 현황 확인
✅ Core Web Vitals 확인
```

### 장기 확인 (배포 후 1-2주)
```
✅ 검색 노출 확인 (Google, 네이버)
✅ 유입 키워드 분석
✅ 페이지 성능 최적화
```

---

## 🎯 빠른 참조

### 배포 명령어
```bash
# 로컬 테스트
npm run build

# 배포
git add -A && git commit -m "feat: 내용" && git push origin main
```

### 확인 URL
```
홈페이지:      https://kimyido.com
robots.txt:    https://kimyido.com/robots.txt
sitemap.xml:   https://kimyido.com/sitemap.xml
RSS 피드:      https://kimyido.com/rss.xml
```

### 관리 대시보드
```
Cloudflare:    https://dash.cloudflare.com
GitHub:        https://github.com/granadu0417-crypto/blog
Search Console: https://search.google.com/search-console
네이버 웹마스터: https://searchadvisor.naver.com
```

### 단축키 모음
```
시크릿 모드:      Ctrl + Shift + N
하드 리프레시:    Ctrl + Shift + R
개발자 도구:      F12
캐시 삭제:        Ctrl + Shift + Delete
```

---

## 💡 베스트 프랙티스

### 배포 전
1. ✅ 로컬에서 `npm run build` 성공 확인
2. ✅ 코드 리뷰 (혼자라도!)
3. ✅ 주요 기능 테스트
4. ✅ 커밋 메시지 명확하게 작성

### 배포 후
1. ✅ **시크릿 모드로 먼저 확인** (가장 중요!)
2. ✅ 체크리스트 따라 확인
3. ✅ 모바일에서도 확인
4. ✅ 에러 로그 확인

### 정기 점검 (주 1회)
1. ✅ Google Search Console 확인
2. ✅ 네이버 웹마스터 확인
3. ✅ Cloudflare Analytics 확인
4. ✅ 사이트 속도 테스트
5. ✅ 깨진 링크 확인

---

## 🚨 긴급 상황 대처

### 사이트가 완전히 다운된 경우
1. **Cloudflare Status** 확인: https://www.cloudflarestatus.com
2. **GitHub Status** 확인: https://www.githubstatus.com
3. **이전 커밋으로 롤백**:
   ```bash
   git revert HEAD
   git push origin main
   ```

### 잘못된 콘텐츠를 배포한 경우
1. **즉시 이전 버전으로 롤백**
2. **수정 후 재배포**
3. **Cloudflare 캐시 퍼지** (선택사항)

### 배포가 계속 실패하는 경우
1. **에러 로그 확인** (Cloudflare Pages)
2. **로컬 빌드 테스트**
3. **의존성 문제 확인**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

---

**마지막 업데이트**: 2025-01-05
**작성자**: Claude Code + 사용자 협업
**문서 버전**: 1.0

## 📝 핵심 요약

> **배포 후 반드시 기억하세요!**
>
> 1. **시크릿 모드로 확인** (Ctrl+Shift+N) ⭐ 가장 중요!
> 2. 안 보이면 하드 리프레시 (Ctrl+Shift+R)
> 3. 그래도 안 되면 캐시 완전 삭제
> 4. Cloudflare Pages 배포 상태 확인
>
> **절대 잊지 마세요**: 일반 모드는 캐시 때문에 이전 버전을 보여줄 수 있습니다!
