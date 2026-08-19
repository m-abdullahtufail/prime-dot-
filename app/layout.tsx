import "./globals.css";
import { archivoExpanded, urbanist } from "@/lib/fonts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivoExpanded.variable} ${urbanist.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
