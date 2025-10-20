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
  VIOLET: "Dog, J, R",
  BLUE: "E, K, N",
  YELLOW: "A, F, L",
  GREEN: "B, C, M",
  PINK: "G, H, T",
  ORANGE: "P, Q, S",
};
