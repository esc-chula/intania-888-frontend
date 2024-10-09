export interface createMySlipDto {
    total: number;
    lines: Slip[];
}

interface Slip {
    match_id: string;
    rate: number;
    betting_on: string;
}

export interface getMySlipHistoryDto {
    id: string;
    total: number;
    user_id: string;
    lines: Bill[];
}

export interface Bill {
    bill_id: string;
    match_id: string;
    rate: number;
    betting_on: string;
    match: Match;
}

interface Match {
    id: string;
    team_a: string;
    team_b: string;
    team_a_score: number;
    team_b_score: number;
    team_a_rate: number;
    team_b_rate: number;
    winner: string;
    type: string;
    start_time: string;
    end_time: string;
}