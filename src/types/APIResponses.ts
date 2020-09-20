export interface APIResponse_MatchSummary {
    result: {
        status: number,
        num_results: number,
        total_results: number,
        results_remaining: number,
        matches: APIResponse_MatchSummary_Match[],
    }
}

interface APIResponse_MatchSummary_Player {
    account_id: number,
    player_slot: number,
    hero_id: number
}

export interface APIResponse_MatchSummary_Match {
    match_id: number,
    match_seq_num: number,
    start_time: number,
    lobby_type: number,
    radiant_team_id: number,
    dire_team_id: number,
    players: APIResponse_MatchSummary_Player[]
}