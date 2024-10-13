const convertToTimeZone = (date: Date, offset: number): Date => {
  const utcDate = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utcDate + 3600000 * offset);
};

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
  groupStage: { start: new Date("2067-10-10"), end: new Date("2067-10-30") },
  semiFinal: { start: new Date("2067-10-31"), end: new Date("2067-11-05") },
  final: { start: new Date("2067-11-05"), end: new Date("2067-11-08") },
} as const;

const LOCATION_MAP: Record<Round, Record<Sport, string>> = {
  groupStage: {
    BASKETBALL: "สนามบาสภาคโยธา",
    FOOTBALL: "ลานพระบรมรูปสองรัชกาล",
    VOLLEYBALL: "ชั้น 12 ตึก 100 ปี",
    CHAIRBALL: "ชั้น 12 ตึก 100 ปี",
  },
  semiFinal: {
    BASKETBALL: "สนามบาสภาคโยธา",
    FOOTBALL: "สนามจินดารักษ์",
    VOLLEYBALL: "ชั้น 12 ตึก 100 ปี",
    CHAIRBALL: "ชั้น 12 ตึก 100 ปี",
  },
  final: {
    BASKETBALL: "Sport Complex",
    FOOTBALL: "สนามเทพหัสดิน",
    VOLLEYBALL: "ชั้น 12 ตึก 100 ปี",
    CHAIRBALL: "ชั้น 12 ตึก 100 ปี",
  },
};

type Sport = "BASKETBALL" | "FOOTBALL" | "VOLLEYBALL" | "CHAIRBALL";
type Round = "groupStage" | "semiFinal" | "final";

const getRoundForDate = (date: Date): Round | null => {

  for (const [round, { start, end }] of Object.entries(DATE_RANGES)) {
    const startAdjusted = convertToTimeZone(start, 7);
    const endAdjusted = convertToTimeZone(end, 7);
    if (date >= startAdjusted && date <= endAdjusted) {
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
