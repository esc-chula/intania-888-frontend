import type { Metadata } from "next";
import '@/styles/globals.css';
import { IBM_Plex_Sans_Thai } from 'next/font/google';

export const metadata: Metadata = {
  title: "Intania 888",
  description: "Intania Game betting website",
};

const IBMFont = IBM_Plex_Sans_Thai({
  subsets: ['latin', 'thai'],
  weight: ["400", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${IBMFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
