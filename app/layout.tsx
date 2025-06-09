import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Electric Vehicle Chargers",
  keywords: [
    "electric vehicle",
    "EV chargers",
    "charging stations",
    "sustainable transport",
    "green energy",
    "renewable energy",
    "clean energy",
    "electric mobility",
    "EV infrastructure",
    "electric car charging",
    "EV charging solutions",
    "smart charging",
    "EV charging network",
    "electric vehicle infrastructure",
    "sustainable transportation",
    "green transportation",
    "renewable transport",
    "clean transport",
    "electric vehicle solutions",
  ],
  description: "Created by the AVT team, this app helps you find electric vehicle charging stations and learn about sustainable transport solutions.",
  authors: [
    {
      name: "AVT Team",
      url: "https://avt.vercel.app",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
