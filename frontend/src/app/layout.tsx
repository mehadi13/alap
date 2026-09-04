import type { Metadata } from "next";
import { Geist, Geist_Mono, Tiro_Bangla } from "next/font/google";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ConsultationModalProvider } from "@/features/consultation/ConsultationModal";
import { JsonLd } from "@/components/shared/JsonLd";
import { SkipToContent } from "@/components/shared/SkipToContent";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tiroBangla = Tiro_Bangla({
  weight: "400",
  subsets: ["bengali"],
  variable: "--font-tiro-bangla",
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alap.ai";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "ALAP (আলাপ) | Business Automation & Digital Solutions",
    template: "%s | ALAP (আলাপ)",
  },
  description:
    "Tell us what takes too much time. ALAP turns manual business overhead into automated digital workflows, APIs, and practical software solutions.",
  keywords: [
    "Business Automation Bangladesh",
    "Customer Support Automation",
    "Sales Lead Routing",
    "E-Commerce Automation",
    "Pathao Courier API Automation",
    "Office Workflow Automation",
    "AI Business Solutions Dhaka",
    "Custom Software Development Bangladesh",
  ],
  authors: [{ name: "ALAP Consultancy Team" }],
  creator: "ALAP",
  publisher: "ALAP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ALAP (আলাপ) | Business Automation & Digital Solutions",
    description:
      "Tell us what takes too much time. ALAP turns manual business overhead into automated digital workflows.",
    url: baseUrl,
    siteName: "ALAP (আলাপ)",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/icon.svg`,
        width: 800,
        height: 800,
        alt: "ALAP Business Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALAP (আলাপ) | Business Automation & Digital Solutions",
    description:
      "Tell us what takes too much time. ALAP turns manual business overhead into automated digital workflows.",
    images: [`${baseUrl}/icon.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${tiroBangla.variable} h-full antialiased`}
    >
      <body
        className="flex min-h-full flex-col bg-[#FFFFFF] text-[#111111] transition-colors duration-200 dark:bg-[#0A0A0A] dark:text-[#F5F5F5]"
        suppressHydrationWarning
      >
        <JsonLd />
        <SkipToContent />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <ConsultationModalProvider>{children}</ConsultationModalProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
