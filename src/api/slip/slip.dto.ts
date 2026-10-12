export interface createMySlipDto {
    total: string;
    lines: Slip[];
}

interface Slip {
    match_id: string;
    betting_on: string;
}

export interface getMySlipHistoryDto {
    id: string;
    total: string;
    user_id: string;
    lines: Bill[];
}

export interface Bill {
    bill_id: string;
    match_id: string;
    rate: string;
    betting_on: string;
    match: Match;
}

interface Match {
    id: string;
    team_a: string;
    team_b: string;
    team_a_score: number;
    team_b_score: number;
    team_a_rate: string;
    team_b_rate: string;
    winner: string;
    type: string;
    start_time: string;
    end_time: string;
}
