import { Intania888Logo } from "../../public/logos/Intania888-logo";
import Image from "next/image";
export const Header = () => {
  return (
    <header className="flex flex-col w-full relative">
      <div className="w-full h-28 p-2 md:py-2 md:px-12 flex flex-row justify-between items-center bg-neutral-900">
        <div className="sm:w-1/4 sm:min-w-[300px] w-[160px]">
          <Intania888Logo />
        </div>

        <div className="flex-col hidden lg:block space-y-1 w-1/2 ml-4 text-white font-semibold">
          <p>ดูและทายผลการแข่งกีฬา intania game ฟรี!</p>
          <p>เว็บเดียวในวิศวะจุฬา แชร์กันเยอะๆ</p>
        </div>

        <div className="flex flex-col items-center justify-center max-sm:w-1/2 text-white space-y-2 text-normal max-sm:text-[0.7rem]">
          <a
            target="_blank"
            href="https://www.instagram.com/intania.games/"
            className="bg-[#FE0966] items-center justify-start w-44 sm:w-64 px-2 sm:px-4 font-semibold rounded-lg flex flex-row space-x-2 sm:space-x-5 py-1"
          >
            <Image
              src="/logos/IgLogo.webp"
              alt="ig_logo"
              height={30}
              width={30}
            />
            <p>@intania.games</p>
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/p/DPfzBbugZZ-/"
            className="bg-[#00C300] items-center justify-start w-44 sm:w-64 px-2 sm:px-4 font-semibold rounded-lg flex flex-row space-x-2 sm:space-x-5 py-1"
          >
            <Image
              src="/logos/LineLogo.webp"
              alt="ig_logo"
              height={30}
              width={30}
            />
            <p>เข้า openchat สีเลย!</p>
          </a>
        </div>
      </div>
    </header>
  );
};
