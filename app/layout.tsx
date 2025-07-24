
'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Krowpu</title>
        <meta name="description" content="Krowpu - Freelance Platform Opposite of Upwork" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Header/>
        {children}
      </body>
    </html>
  );
}
