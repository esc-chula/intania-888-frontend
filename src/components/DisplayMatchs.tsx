import { Banner } from "./MatchBanner";
import { Round } from "./MatchRound";

export const DisplayMatchs = (props: { matchs: matchInterface }) => {
  return (
    <div className="w-full flex flex-col rounded-2xl overflow-hidden">
      <div className="bg-[#4E0F15] w-full h-14 text-lg sm:text-xl flex items-center justify-center font-semibold">
        วันจันทร์ที่ 28 ตุลาคม 2567
      </div>
      <Banner
        location={props.matchs.location}
        sport={props.matchs.sport}
        league={props.matchs.league}
      />
      {props.matchs.round.map((item, index) => (
        <Round round={item} key={index} />
      ))}
      <Banner
        location={props.matchs.location}
        sport={props.matchs.sport}
        league="freshman"
      />
    </div>
  );
};
export interface matchInterface {
  location: string;
  sport: string;
  league: string;
  round: {
    time: string;
    colorA: string;
    colorB: string;
    status: string;
  }[];
}
