import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/common/Navbar";
import Toast from "@/components/common/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | BlogApp",
    default: "BlogApp — Modern Blogging Platform",
  },
  description: "A production-grade blog application built with Next.js, Redux Toolkit, and Redux-Saga.",
  metadataBase: new URL('https://nextjs-blog-assignment.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nextjs-blog-assignment.vercel.app',
    siteName: 'BlogApp',
    title: 'BlogApp — Modern Blogging Platform',
    description: 'Explore the latest in tech and life.',
    images: [
      {
        url: 'https://picsum.photos/seed/blog-og/1200/630',
        width: 1200,
        height: 630,
        alt: 'BlogApp Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlogApp — Modern Blogging Platform',
    description: 'Explore the latest in tech and life.',
    images: ['https://picsum.photos/seed/blog-og/1200/630'],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Toast />
        </Providers>
      </body>
    </html>
  );
}
