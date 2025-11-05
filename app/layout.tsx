import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "내 블로그 | SEO 최적화 블로그",
  description: "고품질 콘텐츠를 제공하는 블로그입니다. 최신 정보와 유용한 팁을 공유합니다.",
  keywords: ["블로그", "SEO", "마케팅", "정보", "팁"],
  authors: [{ name: "블로거" }],
  openGraph: {
    title: "내 블로그",
    description: "고품질 콘텐츠를 제공하는 블로그",
    type: "website",
    locale: "ko_KR",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
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
