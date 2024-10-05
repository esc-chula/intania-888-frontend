export interface matchInterface {
  location: string;
  sport: string;
  league: string;
  round: RoundItem[];
}
export interface allMatchInterface {
  date: string;
  matches: matchInterface[];
}
export const colorBgMap: { [key: string]: string } = {
  freshman: "#DD742C",
  senior: "#0284C7",
  all: "#4D7C0F",
};
export const colorDecoMap: { [key: string]: string } = {
  freshman: "#FB923C",
  senior: "#38BDF8",
  all: "#65A30D",
};
export const sportTextMap: { [key: string]: string } = {
  ALL: "รวมกีฬาทุกประเภท",
  FOOTBALL_MALE_JR: "ฟุตบอลชาย ปี 1",
  FOOTBALL_MALE_SR: "ฟุตบอลชาย ปี 2-4",
  BASKETBALL_MALE_JR: "บาสเก็ตบอลชาย ปี 1",
  BASKETBALL_MALE_SR: "บาสเก็ตบอลชาย ปี 2-4",
  BASKETBALL_FEMALE_SR: "บาสเก็ตบอลหญิง รวมทุกชั้นปี",
  VOLLEYBALL_MALE: "วอลเลย์บอลชาย รวมทุกชั้นปี",
  VOLLEYBALL_FEMALE: "วอลเลย์บอลหญิง รวมทุกชั้นปี",
  SHAREBALL_FEMALE_JR: "แชร์บอลหญิง ปี 1",
  SHAREBALL_FEMALE_SR: "แชร์บอลหญิง ปี 2-4",
};
export const selectorTextMap: { [key: string]: string } = Object.fromEntries(
  Object.entries(sportTextMap).map(([key, value]) => [value, key])
);
export const leagueTextMap: { [key: string]: string } = {
  freshman: "เฉพาะชั้นปีที่ี 1",
  senior: "ชั้นปีที่ 2 ถึง 4",
  all: "รวมทุกชั้นปี",
};

export const cleanData = (props: {
  rawData: rawDataInterface[];
}): allMatchInterface[] => {
  const data: allMatchInterface[] = [];

  props.rawData.map((itemsDate) => {
    const date = formatThaiDate(itemsDate.date);
    const matches: matchInterface[] = [];
    itemsDate.types.map((itemTypes) => {
      // each match (banner match)

      const sport = itemTypes.matches[0].type;
      const league =
        itemTypes.matches[0].type.slice(-2) == "JR"
          ? "freshman"
          : itemTypes.matches[0].type.slice(-2) == "SR"
          ? "senior"
          : "all";
      const location = "สนามกีฬาคิดไปเอง";

      // each round (a white row)
      const round: RoundItem[] = [];
      itemTypes.matches.map((item) => {
        const strTime = new Date(item.start_time);
        const endTime = new Date(item.end_time);
        round.push({
          time_start: formatTime(strTime),
          time_end: formatTime(endTime),
          colorA: item.team_a,
          colorB: item.team_b,
          rateA: item.team_a_rate === null ? 0 : Number(item.team_a_rate),
          scoreA: item.team_a_score === null ? 0 : Number(item.team_a_score),
          rateB: item.team_b_rate === null ? 0 : Number(item.team_b_rate),
          scoreB: item.team_b_score === null ? 0 : Number(item.team_b_score),
          status:
            item.team_a === null || item.team_b === null
              ? "TBA"
              : Date.now() > endTime.getTime()
              ? "done"
              : Date.now() > strTime.getTime()
              ? "playing"
              : "bet",
        });
      });
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
    });
  });
  return data;
};

interface rawDataInterface {
  date: string;
  types: {
    matches: {
      end_time: string;
      start_time: string;
      team_a: string;
      team_b: string;
      team_a_score: string;
      team_b_score: string;
      team_a_rate: string;
      team_b_rate: string;
      type: string;
    }[];
  }[];
}

export type RoundItem = {
  time_start: string;
  time_end: string;
  colorA: string;
  colorB: string;
  rateA: number;
  scoreA: number;
  rateB: number;
  scoreB: number;
  status: string;
};
const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};
function formatThaiDate(dateString: string): string {
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
