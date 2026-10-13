import type { ReactNode } from "react";
import Link from "next/link";
import { PageWithFooter } from "@/components/PageWithFooter";
import { Intania888Logo } from "../../public/logos/Intania888-logo";

interface PublicInfoPageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export const PublicInfoPage = ({
  title,
  description,
  children,
}: PublicInfoPageProps) => (
  <PageWithFooter className="bg-gradient-to-b from-[#4E0F15] via-black to-black text-white">
    <header className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-4 px-6 py-6">
      <Link
        href="/"
        aria-label="Intania 888 home"
        className="block w-32 shrink-0 rounded-sm focus-visible:outline focus-visible:outline-offset-4 sm:w-40 [&_svg]:h-auto [&_svg]:w-full"
      >
        <span aria-hidden="true">
          <Intania888Logo />
        </span>
      </Link>
    </header>
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 pb-12 pt-8">
      <p className="mb-3 text-sm uppercase tracking-widest text-neutral-300">
        Intania Games
      </p>
      <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-7 text-neutral-200">{description}</p>
      <article className="mt-10 space-y-8 text-neutral-200 [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-white [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_li]:leading-7 [&_p]:leading-7 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        {children}
      </article>
    </main>
  </PageWithFooter>
);
