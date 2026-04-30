import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Giffani Rizky Febrian | Data Analyst Portfolio",
  description: "Portfolio of Giffani Rizky Febrian - Data Analyst focused on Operations, Logistics, Process Improvement, and Data Automation.",

   openGraph: {
    title: "Giffani Rizky Febrian | Portfolio",
    description: "Data Analyst focused on Operations, Logistics, and Quality Improvement.",
    url: "https://giffan.vercel.app",
    siteName: "Giffani Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Giffani Rizky Febrian Portfolio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}

<html lang="en" suppressHydrationWarning></html>
