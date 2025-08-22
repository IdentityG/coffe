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
  title: "Mekiya Coffee | Premium Ethiopian Coffee Exporter",
  description: "Discover Mekiya Coffee - Ethiopia's premier exporter of specialty coffee beans including Yirgacheffe, Sidamo, and Harar varieties. Sustainable, direct trade, and exceptional quality.",
  keywords: "Ethiopian coffee, coffee exporter, specialty coffee, Mekiya Coffee, sustainable coffee, direct trade coffee",
  authors: [{ name: "Mekiya Coffee" }],
  openGraph: {
    title: "Mekiya Coffee | Premium Ethiopian Coffee Exporter",
    description: "Discover Ethiopia's finest coffee beans - sustainably sourced and expertly processed for exceptional flavor profiles.",
    url: "https://mekiyacoffee.com",
    siteName: "Mekiya Coffee",
    images: [
      {
        url: '/mekiya.png',
        width: 1000,
        height: 1000,
        alt: 'Mekiya Coffee Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mekiya Coffee | Premium Ethiopian Coffee',
    description: 'Specialty coffee beans from Ethiopia - sustainably sourced and expertly processed.',
    images: ['/mekiya.png'],
  },
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
