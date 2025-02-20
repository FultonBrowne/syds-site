import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/ui/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sydney Morgan's portfolio",
  description: "A portfolio showcasing Sydney Morgan's work and projects.",
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
        <Nav />
        {children}
        <footer className="p-8 ">
          Site built by{" "}
          <a
            className="hover:underline"
            target="_blank"
            href="https://fulton.software"
          >
            Fulton Browne
          </a>
        </footer>
      </body>
    </html>
  );
}
