import {
  allMatchInterface,
  matchInterface,
  rawDataInterface,
  RoundItem,
} from "./MatchInterface";
import { getLocationForSport } from "@/utils/location";

// Data Cleanning --------------
export const cleanData = (props: {
  rawData: rawDataInterface[];
  dateNow: Date;
}): allMatchInterface[] => {
  const data: allMatchInterface[] = [];
  const temp = props.rawData.sort((a: rawDataInterface, b: rawDataInterface) =>
    Number(new Date(a.date).getDate() - new Date(b.date).getDate())
  );

  temp.map((itemsDate) => {
    const date = formatThaiDate(itemsDate.date);
    const date_D = new Date(itemsDate.date);
    const matches: matchInterface[] = [];
    itemsDate.types.map((itemTypes) => {
      // each match (banner match)

      // Skip if no matches in this type
      if (!itemTypes.matches || itemTypes.matches.length === 0) {
        return;
      }

      const sport = itemTypes.matches[0].type;
      const league =
        itemTypes.matches[0].type?.slice(-2) == "JR"
          ? "freshman"
          : itemTypes.matches[0].type?.slice(-2) == "SR"
          ? "senior"
          : "all";

      // each round (a white row)
      const round: RoundItem[] = [];
      itemTypes.matches.map((item) => {
        const strTime = new Date(item.start_time);
        const endTime = new Date(item.end_time);
        round.push({
          match_id: item.id,
          time_start: strTime,
          time_end: endTime,
          type: item.type,
          colorA: item.team_a,
          colorB: item.team_b,
          rateA: item.team_a_rate === null ? 0 : Number(item.team_a_rate),
          scoreA: item.team_a_score === null ? 0 : Number(item.team_a_score),
          rateB: item.team_b_rate === null ? 0 : Number(item.team_b_rate),
          scoreB: item.team_b_score === null ? 0 : Number(item.team_b_score),
          status:
            item.team_a === null || item.team_b === null
              ? "TBA"
              : props.dateNow > endTime
              ? "done"
              : props.dateNow > strTime
              ? "playing"
              : "bet",
        });
      });

      // Calculate location based on first match's sport type and start time
      const location = round.length > 0
        ? getLocationForSport(sport, round[0].time_start)
        : "Unknown date or sport";

      matches.push({
        location,
        sport,
        league,
        round,
      });
    });
    data.push({
      date,
      matches,
      date_D,
    });
  });

  return data;
};

// Time Formatting --------------
export const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export function formatThaiDate(dateString: string): string {
  const daysOfWeek = [
    "อาทิตย์",
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
  ];
  const monthsOfYear = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const date = new Date(dateString);

  const buddhistYear = date.getFullYear() + 543;

  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = monthsOfYear[date.getMonth()];

  return `วัน${dayOfWeek}ที่ ${day} ${month} ${buddhistYear}`;
}
