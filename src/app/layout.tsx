import type { Metadata } from "next";
import "@/styles/globals.css";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Intania 888",
  description: "Intania Game betting website",
};

const IBMFont = IBM_Plex_Sans_Thai({
  subsets: ["latin", "thai"],
  weight: ["400", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body
        className={`${IBMFont.className} antialiased bg-black`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
