import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Link from "next/link";
import { WebSiteSchema } from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kimyido.com'),
  title: {
    default: "kimyido.com - 기술, 재테크, 라이프스타일 블로그",
    template: "%s | kimyido.com",
  },
  description: "기술, 재테크, 건강, 라이프스타일 등 다양한 주제의 실용적인 정보를 공유하는 블로그입니다. Next.js, 구글 애드센스, 투자, 자기계발 등 유용한 가이드를 제공합니다.",
  keywords: ["블로그", "기술", "재테크", "건강", "라이프스타일", "Next.js", "애드센스", "SEO", "웹개발", "투자"],
  authors: [{ name: "kimyido" }],
  creator: "kimyido",
  publisher: "kimyido",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://kimyido.com",
    siteName: "kimyido.com",
    title: "kimyido.com - 기술, 재테크, 라이프스타일 블로그",
    description: "기술, 재테크, 건강, 라이프스타일 등 다양한 주제의 실용적인 정보를 공유하는 블로그",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "kimyido.com 블로그",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "kimyido.com - 기술, 재테크, 라이프스타일 블로그",
    description: "기술, 재테크, 건강, 라이프스타일 등 다양한 주제의 실용적인 정보",
    creator: "@kimyido",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "bZaLS8-6gkMxqIfr5AN903X50Pw6ZNVWTjfycZB12vE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${notoSansKR.variable}`}>
      <body className="font-sans antialiased">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3591490977493759"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <WebSiteSchema
          url="https://kimyido.com"
          name="kimyido.com - 기술, 재테크, 라이프스타일 블로그"
          description="기술, 재테크, 건강, 라이프스타일 등 다양한 주제의 실용적인 정보를 공유하는 블로그"
        />
        <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                  📝 내 블로그
                </Link>
              </div>
              <div className="flex items-center space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                  홈
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
                  소개
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">
                  연락처
                </Link>
                <Link href="/privacy" className="text-gray-700 hover:text-blue-600 transition">
                  개인정보처리방침
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-100 border-t mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">내 블로그</h3>
                <p className="text-gray-600">
                  유용한 정보와 인사이트를 공유하는 블로그입니다.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">링크</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-gray-600 hover:text-blue-600">
                      소개
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-600 hover:text-blue-600">
                      연락처
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-gray-600 hover:text-blue-600">
                      개인정보처리방침
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-gray-600 hover:text-blue-600">
                      이용약관
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">연락처</h3>
                <p className="text-gray-600">
                  이메일: granadu0417@gmail.com
                </p>
              </div>
            </div>
            <div className="border-t mt-8 pt-8 text-center text-gray-600">
              <p>© 2025 내 블로그. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
