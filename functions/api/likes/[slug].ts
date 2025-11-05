// Cloudflare Pages Functions - 좋아요 API
// 자동 엔드포인트: /api/likes/[slug]

// Cloudflare KV 타입 정의
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

interface Env {
  BLOG_LIKES: KVNamespace;
}

// CORS 헤더 설정
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

// OPTIONS 요청 처리 (CORS preflight)
export async function onRequestOptions() {
  return new Response(null, { headers: corsHeaders });
}

// GET - 좋아요 수 조회
export async function onRequestGet(context: { params: { slug: string }, env: Env }) {
  try {
    const { slug } = context.params;
    const { BLOG_LIKES } = context.env;

    // KV에서 좋아요 수 가져오기
    const count = await BLOG_LIKES.get(slug);
    const likeCount = count ? parseInt(count) : 0;

    return new Response(
      JSON.stringify({
        success: true,
        slug,
        count: likeCount
      }),
      { headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to get likes',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
}

// POST - 좋아요 추가
export async function onRequestPost(context: { params: { slug: string }, env: Env }) {
  try {
    const { slug } = context.params;
    const { BLOG_LIKES } = context.env;

    // 현재 좋아요 수 가져오기
    const currentCount = await BLOG_LIKES.get(slug);
    const count = currentCount ? parseInt(currentCount) : 0;

    // 1 증가
    const newCount = count + 1;

    // KV에 저장
    await BLOG_LIKES.put(slug, newCount.toString());

    return new Response(
      JSON.stringify({
        success: true,
        slug,
        count: newCount
      }),
      { headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to add like',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
}

// DELETE - 좋아요 취소
export async function onRequestDelete(context: { params: { slug: string }, env: Env }) {
  try {
    const { slug } = context.params;
    const { BLOG_LIKES } = context.env;

    // 현재 좋아요 수 가져오기
    const currentCount = await BLOG_LIKES.get(slug);
    const count = currentCount ? parseInt(currentCount) : 0;

    // 1 감소 (최소 0)
    const newCount = Math.max(0, count - 1);

    // KV에 저장
    await BLOG_LIKES.put(slug, newCount.toString());

    return new Response(
      JSON.stringify({
        success: true,
        slug,
        count: newCount
      }),
      { headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to remove like',
        message: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
}
