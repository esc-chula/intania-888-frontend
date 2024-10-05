export interface matchInterface {
  location: string;
  sport: string;
  league: string;
  round: RoundItem[];
}
export interface allMatchInterface {
  date: string;
  date_D: Date;
  matches: matchInterface[];
}

export interface rawDataInterface {
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
