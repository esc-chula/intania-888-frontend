import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 overflow-clip w-full flex justify-center cursor-pointer animate-blink z-10">
      <Link
        href="https://docs.google.com/forms/d/1bq6gw44xRH98jXVkAk4u8svNsEBPmBtEvvdvkL4zpKQ"
        className="relative"
        target="_blank"
      >
        <Image
          src="/banner-2.png"
          alt="sweatshirt_banner"
          width={2214}
          height={330}
          className="object-contain w-auto hover:scale-110 duration-500"
        />
      </Link>
    </div>
  );
};
