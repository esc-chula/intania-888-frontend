import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";

interface PageWithFooterProps {
  children: ReactNode;
  className?: string;
}

// Flexible content fills short pages; longer content naturally pushes the footer down.
export const PageWithFooter = ({
  children,
  className = "",
}: PageWithFooterProps) => (
  <div className={`flex min-h-dvh w-full flex-col bg-black ${className}`}>
    {children}
    <Footer />
  </div>
);
