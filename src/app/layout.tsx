import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { CoffeeLoaderProvider } from "../components/CoffeeLoaderProvider";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mekiya Coffee",
  description: "Premium coffee exports worldwide",
  icons: {
    icon: [
    { url: '/mekiya.png', sizes: '1000x1000', type: 'image/png' },
    ],
    shortcut: '/mekiya.png',
    apple: '/mekiya.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-cream text-coffee-dark`}
      >
        <CoffeeLoaderProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </CoffeeLoaderProvider>
      </body>
    </html>
  );
}
