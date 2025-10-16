import React from "react";
import { Intania888Logo } from "../../../public/logos/Intania888-logo";
import Link from "next/link";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-5 text-white h-screen">
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
      <Link
        href="/register/condition"
        className="text-sm underline cursor-pointer"
      >
        ข้อกำหนดและเงื่อนไขการใช้งาน
      </Link>
    </div>
  );
};

export default RegisterPage;
