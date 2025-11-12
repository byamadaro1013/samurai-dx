import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/leasur/Header";
import Footer from "@/components/layout/leasur/Footer";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className}`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
