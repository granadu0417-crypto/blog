import { ImageResponse } from 'next/og';

export const alt = 'kimyido.com - 기술, 재테크, 라이프스타일 블로그';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 20,
            padding: '60px 80px',
          }}
        >
          {/* Icon */}
          <div style={{ fontSize: 80, marginBottom: 20 }}>📝</div>

          {/* Site name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 20,
            }}
          >
            kimyido.com
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: 30,
            }}
          >
            기술 · 재테크 · 라이프스타일 블로그
          </div>

          {/* Decorative line */}
          <div
            style={{
              width: 400,
              height: 4,
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 2,
              marginBottom: 30,
            }}
          />

          {/* Bottom text */}
          <div
            style={{
              fontSize: 24,
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            유용한 정보와 인사이트를 공유합니다
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
