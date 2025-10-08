import "./globals.css";
import { Poppins, Noto_Sans_Georgian } from "next/font/google";

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

export const metadata = {
  title: "Design in Motion | DIO",
  description: "Architects Event 2025 – Innovation in Architecture and Design",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${englishFont.variable} ${georgianFont.variable} font-sans bg-white text-gray-800`}
      >
        {children}
      </body>
    </html>
  );
}
