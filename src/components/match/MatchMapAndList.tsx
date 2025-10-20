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
  BASKETBALL_MALE_JR: "บาสเก็ตบอลชาย ปี 1",
  BASKETBALL_MALE_SR: "บาสเก็ตบอลชาย ปี 2-4",
  BASKETBALL_FEMALE_ALL: "บาสเก็ตบอลหญิง รวมชั้นปี",
  VOLLEYBALL_MALE_ALL: "วอลเลย์บอลชาย รวมชั้นปี",
  VOLLEYBALL_FEMALE_ALL: "วอลเลย์บอลหญิง รวมชั้นปี",
  FOOTBALL_MALE_JR: "ฟุตบอลชาย ปี 1",
  FOOTBALL_MALE_SR: "ฟุตบอลชาย ปี 2-4",
  CHAIRBALL_FEMALE_ALL: "แชร์บอลหญิง รวมชั้นปี",
  RUNNING: "วิ่งเปี้ยว",
  TUG_OF_WAR: "ชักเย่อ",
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
  "บาสเก็ตบอลชาย ปี 1",
  "บาสเก็ตบอลชาย ปี 2-4",
  "บาสเก็ตบอลหญิง รวมชั้นปี",
  "วอลเลย์บอลชาย รวมชั้นปี",
  "วอลเลย์บอลหญิง รวมชั้นปี",
  "ฟุตบอลชาย ปี 1",
  "ฟุตบอลชาย ปี 2-4",
  "แชร์บอลหญิง รวมชั้นปี",
  "วิ่งเปี้ยว",
  "ชักเย่อ",
];
