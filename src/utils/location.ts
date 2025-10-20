const thaiMonths = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", 
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

export function parseThaiDate(thaiDateString: string): Date {
  const dateRegex = /วัน\w+ที่ (\d{1,2}) (\w+) (\d{4})/; 
  const match = thaiDateString.match(dateRegex);

  if (!match) return new Date();

  const day = parseInt(match[1], 10);
  const monthIndex = thaiMonths.indexOf(match[2]);
  const buddhistYear = parseInt(match[3], 10);
  const year = buddhistYear - 543; 

  if (monthIndex === -1) return new Date(); 

  return new Date(year, monthIndex, day); 
}


const DATE_RANGES = {
  groupStage: { start: new Date("2025-10-17"), end: new Date("2025-11-03T23:59:59") },
  final: { start: new Date("2025-11-05"), end: new Date("2025-11-07T23:59:59") },
} as const;

const LOCATION_MAP: Record<Round, Record<Sport, string>> = {
  groupStage: {
    BASKETBALL: "สนามโยธา",
    FOOTBALL: "ลานพระบรมรูปสองรัชกาล",
    VOLLEYBALL: "ตึก 100 ปี ชั้น 12",
    CHAIRBALL: "ตึก 100 ปี ชั้น 12",
    RUNNING: "ลานเกียร์",
    TUG_OF_WAR: "ลานเกียร์",
  },
  final: {
    BASKETBALL: "สนามกีฬาในร่ม 1",
    FOOTBALL: "สนามจุ๊บ",
    VOLLEYBALL: "ตึก 100 ปี ชั้น 12",
    CHAIRBALL: "ตึก 100 ปี ชั้น 12",
    RUNNING: "ลานเกียร์",
    TUG_OF_WAR: "ลานเกียร์",
  },
};

type Sport = "BASKETBALL" | "FOOTBALL" | "VOLLEYBALL" | "CHAIRBALL" | "RUNNING" | "TUG_OF_WAR";
type Round = "groupStage" | "final";

const getRoundForDate = (date: Date): Round | null => {

  for (const [round, { start, end }] of Object.entries(DATE_RANGES)) {
    if (date >= start && date <= end) {
      return round as Round;
    }
  }
  return null;
};

const getLocationForSport = (sport: string, date: Date): string => {
  const dateObj = new Date(date);

  const round = getRoundForDate(dateObj);
  if (!round) {
    return "Unknown date or sport";
  }

  const sportType = Object.keys(LOCATION_MAP[round]).find((sportType) =>
    sport.includes(sportType)
  ) as Sport | undefined;

  return sportType ? LOCATION_MAP[round][sportType] : "สนามกีฬาคิดไปเอง";
};

export { getLocationForSport };
