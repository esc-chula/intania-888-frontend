import type { Metadata } from "next";
import "@/styles/globals.css";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import { Header } from "@/components/Header";
import { Navbar } from "@/components/Navbar";

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
      <body
        className={`${IBMFont.className} antialiased bg-gradient-to-b from-[#171717] to-[#000]`}
      >
        <div className="absolute w-full top-0 flex flex-col">
          <Header />
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
