import { ReactNode } from "react";

export interface LeaderboardRow {
  key: string;
  rank: number | string;
  name: ReactNode;
  value: ReactNode;
  // shaded row, e.g. the current user or their color
  highlight?: boolean;
}

const cellRank = "flex items-center justify-center w-[15%] h-full";
const cellName = "flex items-center justify-start w-[50%] sm:w-[45%] h-full px-2 sm:px-5";
const cellValue = "flex flex-row gap-2 items-center justify-center w-[35%] sm:w-[40%] h-full";

export const LeaderboardTable = (props: {
  valueHeader: ReactNode;
  rows: LeaderboardRow[];
  footer?: LeaderboardRow;
}) => {
  const renderRow = (row: LeaderboardRow) => (
    <tr
      key={row.key}
      className={`${
        row.highlight ? "bg-neutral-200" : "bg-neutral-100"
      } text-black w-full h-14 sm:h-[72px] flex flex-row border-b-2 border-neutral-300 last:border-b-0`}
    >
      <td className={cellRank}>{row.rank}</td>
      <td className={cellName}>{row.name}</td>
      <td className={cellValue}>{row.value}</td>
    </tr>
  );

  return (
    <table className="rounded-xl w-[90vw] sm:w-[700px] overflow-hidden font-semibold text-[0.8rem] sm:text-xl h-auto">
      <thead className="bg-[#4E0F15] text-white h-12 sm:h-16 flex flex-row">
        <tr className="w-full flex flex-row">
          <th className={`${cellRank} font-semibold`}>ลำดับ</th>
          <th className={`${cellName} font-semibold`}>ชื่อ</th>
          <th className={`${cellValue} font-semibold`}>{props.valueHeader}</th>
        </tr>
      </thead>
      <tbody>{props.rows.map(renderRow)}</tbody>
      {props.footer && (
        <tfoot>{renderRow({ ...props.footer, highlight: true })}</tfoot>
      )}
    </table>
  );
};
