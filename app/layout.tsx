
'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import { AuthProvider } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

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
      <body className={`${inter.variable} antialiased text-black bg-white`}>
        <AuthProvider>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Header/>
            <AnimatePresence mode="wait">
              <motion.main
                key={typeof window !== 'undefined' ? window.location.pathname : 'home'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {children}
              </motion.main>
            </AnimatePresence>
          </motion.div>
        </AuthProvider>
      </body>
    </html>
  );
}
