import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = new URL("https://sanalyerim.com");
const title = "Samet Kayhan | Sanalyerim";
const description = "Personal hub for web, mobile, and selected digital work.";
const previewImage = "/og-image.png";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  applicationName: "Sanalyerim",
  keywords: ["Samet Kayhan", "Sanalyerim", "Web Design", "Mobile App Developer", "Portfolio"],
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title,
    description,
    siteName: "Sanalyerim",
    locale: "tr_TR",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Sanalyerim preview card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [previewImage],
  },
};

const GA_MEASUREMENT_ID = "G-MBJMH9326K";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </html>
  );
}
