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

export const metadata = {
  title: "Giffani Rizky Febrian | Data Analyst Portfolio",
  description: "Turning data into actionable insights for operational excellence.",

  openGraph: {
    title: "Giffani Rizky Febrian | Data Analyst Portfolio",
    description: "Data Automation • Logistics Analytics • Process Optimization",
    url: "https://giffan.vercel.app",
    siteName: "Giffan Portfolio",
    images: [
      {
        url: "https://giffan.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Giffani Portfolio",
    description: "Data-driven portfolio",
    images: ["/og-image.png"],
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
