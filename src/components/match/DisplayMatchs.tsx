import { Banner } from "./MatchBanner";
import { Round } from "./MatchRound";
import { matchInterface } from "./MatchUtils";

export const DisplayMatchs = (props: {
  matchs: matchInterface[];
  date: string;
}) => {
  return (
    <div className="w-[95%] sm:w-full flex flex-col rounded-2xl overflow-hidden">
      <div className="bg-[#4E0F15] w-full h-14 text-lg sm:text-xl flex items-center justify-center font-semibold">
        {props.date}
      </div>
      {props.matchs.map((match, index) => {
        return (
          <div key={index}>
            <Banner
              location={match.location}
              sport={match.sport}
              league={match.league}
            />
            {match.round.map((item, index) => (
              <Round round={item} key={index} />
            ))}{" "}
          </div>
        );
      })}
    </div>
  );
};
