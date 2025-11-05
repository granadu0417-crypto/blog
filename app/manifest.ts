import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'kimyido.com - 기술, 재테크, 라이프스타일 블로그',
    short_name: 'kimyido',
    description: '기술, 재테크, 건강, 라이프스타일 등 다양한 주제의 실용적인 정보를 공유하는 블로그',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
