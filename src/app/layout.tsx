import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Transport Unified System",
  description: "Network Operations Center (NOC) style dashboard for telecom transport network management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark font-sans", inter.variable)}>
      <body className="bg-background text-textPrimary antialiased min-h-screen flex flex-col">
        <Sidebar />
        <Header />
        <main className="flex-1 ml-16 p-6 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
