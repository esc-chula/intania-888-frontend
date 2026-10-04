import { colorMap } from "../match/MatchColorLogo";

export interface LeaderboardUser {
  id: string;
  nick_name: string;
  group_id: string;
  remaining_coin: number;
}

export const teamColors = ["VIOLET", "BLUE", "YELLOW", "GREEN", "PINK", "ORANGE"];

export const groupAndColorMap: { [key: string]: string } = {
  A: "YELLOW",
  B: "GREEN",
  C: "GREEN",
  DOG: "VIOLET",
  Dog: "VIOLET",
  E: "BLUE",
  F: "YELLOW",
  G: "PINK",
  H: "PINK",
  J: "VIOLET",
  K: "BLUE",
  L: "YELLOW",
  M: "GREEN",
  N: "BLUE",
  P: "ORANGE",
  Q: "ORANGE",
  R: "VIOLET",
  S: "ORANGE",
  T: "PINK",
};

export const colorOfGroup = (groupId?: string) =>
  (groupId && groupAndColorMap[groupId]) || "TBA";

export const formatCoin = (coin: number) =>
  coin.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

// "เจ้าเข้ม สีชมพู" with the color name tinted
export const NameWithColor = (props: {
  name: string;
  color: string;
  isMe?: boolean;
}) => (
  <p className="truncate">
    {props.name}{" "}
    <span style={{ color: colorMap[props.color].color }}>
      {props.color === "TBA" ? "สี..." : colorMap[props.color].name}
    </span>
    {props.isMe && <span className="text-neutral-500"> (คุณ)</span>}
  </p>
);
