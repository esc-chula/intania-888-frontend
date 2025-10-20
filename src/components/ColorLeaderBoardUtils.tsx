export const sortLeaderboardDataByWon = (data: leaderboardDataInterface[]) => {
  return data.sort((a, b) => {
    if (a.won !== b.won) {
      return b.won - a.won;
    }

    if (a.drawn !== b.drawn) {
      return b.drawn - a.drawn;
    }

    return a.lost - b.lost;
  });
};

export interface leaderboardDataInterface {
  id: string;
  title: string;
  won: number;
  drawn: number;
  lost: number;
  total_matches: number;
}

export const groupColor: { [key: string]: string } = {
  PINK: "[G,H,T]",
  ORANGE: "[P,Q,S]",
  GREEN: "[B,C,M]",
  BLUE: "[E,K,N]",
  VIOLET: "[Dog,J,R]",
  YELLOW: "[A,F,L]",
};
