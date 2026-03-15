import type { Metadata } from 'next';
import './globals.css';
import Bezel from '../components/Bezel';

export const metadata: Metadata = {
  title: 'HISHIKAWA.Y',
  description: 'Portfolio of Hishikawa Yuki — LINE chatbot, LP design, freelance engineer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Dot+Gothic+16&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Bezel>{children}</Bezel>
      </body>
    </html>
  );
}
