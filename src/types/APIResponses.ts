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

interface APIResponse_Match_Player_Levels {
    ability: number
    time: number
    level: number
}

export interface APIResponse_Match_Player {
    account_id: number | undefined
    leaver_status: number | undefined
    ability_upgrades: APIResponse_Match_Player_Levels[] | undefined
    player_slot: number
    hero_id: number
    item_0: number
    item_1: number
    item_2: number
    item_3: number
    item_4: number
    item_5: number
    backpack_0: number
    backpack_1: number
    backpack_2: number
    item_neutral: number
    kills: number
    deaths: number
    assists: number
    hero_damage: number
    tower_damage: number
    hero_healing: number
    gold: number
    last_hits: number
    denies: number
    gold_per_min: number
    xp_per_min: number
    gold_spent: number
    scaled_hero_damage: number
    scaled_tower_damage: number
    scaled_hero_healing: number
    level: number
}

export interface APIResponse_Match_PickBan {
    is_pick: boolean
    hero_id: number
    team: number
    order: number
}

export interface APIResponse_Match_Match {
    players: APIResponse_Match_Player[],
    radiant_win: boolean,
    duration: number,
    pre_game_duration: number,
    start_time: number,
    match_id: number,
    match_seq_num: number,
    tower_status_radiant: number,
    tower_status_dire: number,
    barracks_status_radiant: number,
    barracks_status_dire: number,
    cluster: number,
    first_blood_time: number,
    lobby_type: number,
    human_players: number,
    leagueid: number,
    positive_votes: number,
    negative_votes: number,
    game_mode: number,
    flags: number,
    engine: number,
    radiant_score: number,
    dire_score: number
    picks_bans: APIResponse_Match_PickBan[]
}

export interface APIResponse_Match {
    result: APIResponse_Match_Match
}