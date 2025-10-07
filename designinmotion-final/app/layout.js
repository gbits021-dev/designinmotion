export const metadata = {
  title: "Design in Motion",
  description: "DIO Architects Event 2025",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif', backgroundColor: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
