import React from "react";
import { Intania888Logo } from "../../../public/logos/Intania888-logo";
import Link from "next/link";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { PageWithFooter } from "@/components/PageWithFooter";

const RegisterPage = () => {
  return (
    <PageWithFooter>
      <main className="flex flex-1 flex-col items-center justify-center space-y-5 px-5 py-10 text-white">
        <div className="w-72 h-16">
          <Intania888Logo />
        </div>
        <p className="text-sm max-w-[70%] text-center sm:hidden">
          ดูและทายผลการแข่งกีฬา intania game ฟรี! เว็บเดียวในวิศวะจุฬา
          แชร์กันเยอะๆ
        </p>
        <section className="flex flex-col items-center justify-center space-y-1.5 font-semibold pt-2">
          <GoogleLoginButton />
        </section>
        <p className="max-sm:text-xs text-lg">
          ใช้อีเมลนิสิตจุฬาในการยืนยันตัวตน
        </p>
        <nav
          aria-label="Before signing in"
          className="flex flex-wrap justify-center gap-4 text-sm"
        >
          <Link href="/about" className="underline">
            About
          </Link>
          <Link href="/privacy" className="underline">
            Privacy policy
          </Link>
          <Link href="/terms" className="underline">
            Terms of service
          </Link>
        </nav>
      </main>
    </PageWithFooter>
  );
};

export default RegisterPage;
