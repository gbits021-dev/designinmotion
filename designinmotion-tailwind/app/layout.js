import "./globals.css";

export const metadata = {
  title: "Design in Motion",
  description: "DIO Architects Event 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
