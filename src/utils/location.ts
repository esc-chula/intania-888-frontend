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
    if (date >= start && date <= end) {
      return round as Round;
    }
  }
  return null;
};

const getLocationForSport = (sport: string, date: string): string => {
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
