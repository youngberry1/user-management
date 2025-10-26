import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Created By Trending Boss",
  description: "I am a frontend developer",
  icons: {
    icon: "/brand.jpg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-linear-to-br from-gray-900 to-gray-800">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-dvh bg-linear-to-br from-gray-900 to-gray-800 overflow-x-hidden overscroll-none">
          {children}
        </div>
      </body>
    </html>
  );
}
