import "./globals.css";
import { Poppins, Noto_Sans_Georgian } from "next/font/google";
import content from "./content";

const englishFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-english",
});

const georgianFont = Noto_Sans_Georgian({
  subsets: ["georgian"],
  weight: ["400", "600"],
  variable: "--font-georgian",
});

// Generate @font-face CSS for custom fonts
function generateFontFaceCSS() {
  if (!content.fonts?.uploadedFonts || content.fonts.uploadedFonts.length === 0) {
    return '';
  }

  return content.fonts.uploadedFonts.map(font => {
    const formatMap = {
      'woff2': 'woff2',
      'woff': 'woff',
      'ttf': 'truetype',
      'otf': 'opentype',
      'eot': 'embedded-opentype'
    };

    return `
      @font-face {
        font-family: '${font.name}';
        src: url('${font.url}') format('${formatMap[font.format] || font.format}');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
      }
    `;
  }).join('\n');
}

export const metadata = {
  title: "Design in Motion 2025 | DIO Architects Event",
  description: "Join us at Design in Motion 2025 - an inspiring half-day event where architecture meets technology. November 20, 2025 at Tbilisi Marriott Hotel. Connect with leading architects, designers, and industry professionals.",
  keywords: "architecture, design, DIO, architects event, building systems, Tbilisi, innovation, construction, engineering",
  authors: [{ name: "DIO" }],
  creator: "DIO",
  publisher: "DIO",
  openGraph: {
    title: "Design in Motion 2025 | DIO Architects Event",
    description: "Join us for an inspiring half-day event where architecture meets technology. November 20, 2025 at Tbilisi Marriott Hotel.",
    url: "https://designinmotion.dio.ge",
    siteName: "Design in Motion",
    images: [
      {
        url: "/banner.jpg",
        width: 1200,
        height: 630,
        alt: "Design in Motion 2025 Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design in Motion 2025 | DIO Architects Event",
    description: "Join us for an inspiring architectural event. November 20, 2025 at Tbilisi Marriott Hotel.",
    images: ["/banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  const customFontCSS = generateFontFaceCSS();

  return (
    <html lang="en">
      <head>
        {customFontCSS && (
          <style dangerouslySetInnerHTML={{ __html: customFontCSS }} />
        )}
      </head>
      <body
        className={`${englishFont.variable} ${georgianFont.variable} font-sans bg-white text-gray-800`}
      >
        {children}
      </body>
    </html>
  );
}
