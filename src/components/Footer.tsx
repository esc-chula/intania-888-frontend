import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 bg-[#821922] h-24 overflow-clip w-full flex justify-center cursor-pointer animate-blink">
      <Link
        href="https://intania.link/intania-shop-sweatshirt"
        className="relative"
        target="_blank"
      >
        <Image
          src="/sweatshirt_banner.png"
          alt="sweatshirt_banner"
          width={2214}
          height={330}
          className="object-contain w-auto h-24 hover:scale-110 duration-500"
        />
      </Link>
    </div>
  );
};
