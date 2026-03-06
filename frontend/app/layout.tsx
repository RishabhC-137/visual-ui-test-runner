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
  title: "Visual UI Test Runner",
  description: "A simple visual regression testing tool built with Playwright and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 text-slate-800`}
      >

        {/* Header */}
        <header className="border-b bg-white">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="font-semibold text-lg">
              Visual UI Test Runner
            </h1>

            <a
              href="https://github.com/RishabhC-137"
              target="_blank"
              className="text-sm text-indigo-600 hover:underline"
            >
              GitHub
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main className="max-w-5xl mx-auto px-6 py-10">
          {children}
        </main>

      </body>
    </html>
  );
}