export const sortLeaderboardDataByWon = (
  data: readonly leaderboardDataInterface[] = [],
) => {
  return [...data].sort((a, b) => {
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
  VIOLET: "Dog, T, J",
  BLUE: "F, K, R",
  RED: "C, H, Q",
  GREEN: "B, P, S",
  PINK: "A, G, N",
  ORANGE: "E, L, M",
};
