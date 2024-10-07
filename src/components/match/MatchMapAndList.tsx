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
  BASKETBALL_FEMALE_ALL: "บาสเก็ตบอลหญิง รวมทุกชั้นปี",
  VOLLEYBALL_MALE_ALL: "วอลเลย์บอลชาย รวมทุกชั้นปี",
  VOLLEYBALL_FEMALE_ALL: "วอลเลย์บอลหญิง รวมทุกชั้นปี",
  CHAIRBALL_FEMALE_JR: "แชร์บอลหญิง ปี 1",
  CHAIRBALL_FEMALE_SR: "แชร์บอลหญิง ปี 2-4",
};
export const selectorTextMap: { [key: string]: string } = Object.fromEntries(
  Object.entries(sportTextMap).map(([key, value]) => [value, key])
);
export const leagueTextMap: { [key: string]: string } = {
  freshman: "ชั้นปีที่ 1",
  senior: "ชั้นปีที่ 2-4",
  all: "รวมชั้นปี",
};
export const choicesList = [
  "รวมกีฬาทุกประเภท",
  "ฟุตบอลชาย ปี 1",
  "ฟุตบอลชาย ปี 2-4",
  "บาสเก็ตบอลชาย ปี 1",
  "บาสเก็ตบอลชาย ปี 2-4",
  "บาสเก็ตบอลหญิง รวมทุกชั้นปี",
  "วอลเลย์บอลชาย รวมทุกชั้นปี",
  "วอลเลย์บอลหญิง รวมทุกชั้นปี",
  "แชร์บอลหญิง ปี 1",
  "แชร์บอลหญิง ปี 2-4",
];
