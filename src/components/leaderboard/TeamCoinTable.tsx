import { Coins } from "lucide-react";
import { TeamCoinDisplayProps } from "@/types/leaderboard";
import { TeamShirtIcon } from "./TeamShirtIcon";

export const TeamCoinTable = ({ items }: TeamCoinDisplayProps) => (
  <div className="w-full max-w-md overflow-hidden rounded-lg">
    <table className="w-full table-fixed text-xs sm:text-sm">
      <thead className="h-12 bg-[#4E0F15] text-white">
        <tr>
          <th scope="col" className="w-[16%] px-2 text-center font-semibold">
            ลำดับ
          </th>
          <th scope="col" className="w-[44%] px-2 text-left font-semibold">
            ชื่อ
          </th>
          <th scope="col" className="w-[40%] px-3 text-right font-semibold">
            <span className="inline-flex items-center gap-1">
              จำนวนเหรียญ
              <Coins className="h-3.5 w-3.5 text-[#D6A928]" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody className="text-black">
        {items.map((item, index) => (
          <tr
            key={item.colorId}
            className={index % 2 === 0 ? "bg-white" : "bg-neutral-200"}
          >
            <td className="h-14 px-2 text-center font-semibold">{item.rank}</td>
            <td className="h-14 px-2">
              <div className="flex items-center gap-2 font-semibold">
                <TeamShirtIcon colorId={item.colorId} className="h-7 w-7" />
                <span>
                  {item.title}
                  {item.isCurrentTeam && (
                    <span className="ml-1 font-normal text-neutral-500">
                      (สีของคุณ)
                    </span>
                  )}
                </span>
              </div>
            </td>
            <td className="h-14 px-3 text-right font-semibold">
              {item.teamCoinsText}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

