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
      id: string;
      end_time: string;
      start_time: string;
      team_a: string;
      team_b: string;
      team_a_score: number | null;
      team_b_score: number | null;
      team_a_rate: number;
      team_b_rate: number;
      type: string;
    }[];
  }[];
}

export type RoundItem = {
  match_id: string;
  time_start: Date;
  time_end: Date;
  colorA: string;
  colorB: string;
  rateA: number;
  scoreA: number;
  rateB: number;
  type: string;
  scoreB: number;
  status: string;
};
