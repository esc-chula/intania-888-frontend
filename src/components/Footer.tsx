import Link from "next/link";

export const Footer = () => (
  <footer className="w-full border-t border-white/15 bg-black px-3 py-5 text-xs text-neutral-300 sm:px-6 sm:text-sm">
    <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 whitespace-nowrap">
      <p className="shrink-0">
        Intania 888<span className="hidden sm:inline"> · Intania Games</span>
      </p>
      <nav
        aria-label="Information and policies"
        className="flex shrink-0 items-center gap-3 sm:gap-5"
      >
        <Link href="/about" className="hover:text-white hover:underline">
          About
        </Link>
        <Link href="/privacy" className="hover:text-white hover:underline">
          Privacy
        </Link>
        <Link href="/terms" className="hover:text-white hover:underline">
          Terms
        </Link>
        <a href="mailto:tech@intania.org" className="hover:text-white hover:underline">
          Contact
        </a>
      </nav>
    </div>
  </footer>
);
