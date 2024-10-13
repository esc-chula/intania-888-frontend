const convertToTimeZone = (date: Date, offset: number): Date => {
  const utcDate = date.getTime() + date.getTimezoneOffset() * 60000;
  return new Date(utcDate + 3600000 * offset); // Adjusting for the timezone offset
};


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

const getRoundForDate = (date: Date, timezoneOffset: number): Round | null => {
  const adjustedDate = convertToTimeZone(date, timezoneOffset);

  for (const [round, { start, end }] of Object.entries(DATE_RANGES)) {
    const startAdjusted = convertToTimeZone(start, timezoneOffset);
    const endAdjusted = convertToTimeZone(end, timezoneOffset);
    if (adjustedDate >= startAdjusted && adjustedDate <= endAdjusted) {
      return round as Round;
    }
  }
  return null;
};

const getLocationForSport = (sport: string, date: string): string => {
  const dateObj = new Date(date);
  const timezoneOffset = 7;

  const round = getRoundForDate(dateObj, timezoneOffset);
  if (!round) {
    return "Unknown date or sport";
  }

  const sportType = Object.keys(LOCATION_MAP[round]).find((sportType) =>
    sport.includes(sportType)
  ) as Sport | undefined;

  return sportType ? LOCATION_MAP[round][sportType] : "สนามกีฬาคิดไปเอง";
};

export { getLocationForSport };
