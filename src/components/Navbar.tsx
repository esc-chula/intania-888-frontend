import { Trophy, ReceiptText, Joystick, Coins } from "lucide-react";
export const Navbar = () => {
  return (
    <div className="w-screen h-[55px] bg-neutral-900 flex flex-row items-center m-0 text-white select-none cursor-pointer">
      <div className="w-1/4 h-full items-center justify-center group relative">
        <div className="flex flex-row space-x-2 h-full items-center justify-center">
          <Trophy />
          <p>แมตช์</p>
        </div>
        <div className="group-hover:h-1  w-full h-0 group-hover:bg-white transition-all absolute bottom-0"></div>
      </div>
      <div className="w-1/4 h-full items-center justify-center group relative">
        <div className="flex flex-row space-x-2 h-full items-center justify-center">
          <ReceiptText />
          <p>สลิป</p>
        </div>
        <div className="group-hover:h-1  w-full h-0 group-hover:bg-white transition-all absolute bottom-0"></div>
      </div>
      <div className="w-1/4 h-full items-center justify-center group relative">
        <div className="flex flex-row space-x-2 h-full items-center justify-center">
          <Joystick />
          <p>อีเวนต์</p>
        </div>
        <div className="group-hover:h-1  w-full h-0 group-hover:bg-white transition-all absolute bottom-0"></div>
      </div>

      <div className="w-1/4 h-full items-center justify-center group relative">
        <div className="flex flex-row space-x-2 h-full items-center justify-center">
          <p>100,000</p>
          <Coins color="yellow" />
        </div>
        <div className="group-hover:h-1  w-full h-0 group-hover:bg-white transition-all absolute bottom-0"></div>
      </div>
    </div>
  );
};
