import { Player } from './Players';
import { Hero } from './Heroes';

export enum Team {
    RADIANT=0, DIRE=1
}

export interface Pick {
    // True if pick, false if ban
    is_pick: boolean,
    team: Hero,
    hero_id: number,
    order: number
}

export interface Match {
    players: Player[],
    radiant_win: boolean,
    // Length of the match in seconds
    duration: number,
    pre_game_duration: number,
    // Unix timestamp for the time at which the game started
    start_time: number,
    // Unique ID for this match
    match_id: number,
    // Unique incrementing ID for this match
    match_seq_num: number,
    // Final Tower Status
    tower_status_radiant: TowerStatus,
    tower_status_dire: TowerStatus,
    // Final Barracks Status
    barracks_status_radiant: RaxStatus,
    barracks_status_dire: RaxStatus,

    cluster: 135,
    // Time in seconds at which first blood occured
    first_blood_time: 68,
    // Whether the lobby is public/private/other
    lobby_type: LobbyType,
    // Number of human players
    human_players: number,
    // ID of league this game was played in. 0 if no league.
    leagueid: 0,
    // Community opinion of game
    positive_votes: 0,
    negative_votes: 0,
    // Type of dota game being played
    game_mode: GameMode,
    // Unknown what flags are
    flags: number,
    // Source 1 vs Source 2
    engine: Engine,
    // Radiant and Dire total kills
    radiant_score: 27,
    dire_score: 9,
    // Ordered list of picks and bans
    picks_bans: Pick[]
}

export enum LobbyType {
    INVALID=-1,
    PUBLIC_MATCHMAKING=0,
    PRACTISE=1,
    TOURNAMENT=2,
    TUTORIAL=3,
    COOP_WITH_BOTS=4,
    TEAM_MATCH=5,
    SOLO_QUEUE=6,
    RANKED=7,
    MID_1V1=8,
}

export function convertTowerStatus(status: number): TowerStatus {
    const mask = {
        Top1: 1, Top2: 2, Top3: 4,
        Mid1: 8, Mid2: 16, Mid3: 32,
        Bot1: 64, Bot2: 128, Bot3: 256,
        Top4: 512, Bot4: 1024 
    };
    return {
        MidTier1: Boolean(status & mask.Mid1),
        MidTier2: Boolean(status & mask.Mid2),
        MidTier3: Boolean(status & mask.Mid3),
        TopTier1: Boolean(status & mask.Top1),
        TopTier2: Boolean(status & mask.Top2),
        TopTier3: Boolean(status & mask.Top3),
        TopTier4: Boolean(status & mask.Top4),
        BotTier1: Boolean(status & mask.Bot1),
        BotTier2: Boolean(status & mask.Bot2),
        BotTier3: Boolean(status & mask.Bot3),
        BotTier4: Boolean(status & mask.Bot4),
    };
}

export interface TowerStatus {
    MidTier1: boolean, MidTier2: boolean, MidTier3: boolean,
    TopTier1: boolean, TopTier2: boolean, TopTier3: boolean, TopTier4: boolean,
    BotTier1: boolean, BotTier2: boolean, BotTier3: boolean, BotTier4: boolean,
}

export function convertRaxStatus(status: number): RaxStatus {
    const mask = {
        TopMelee: 1, TopRanged: 2,
        MidMelee: 4, MidRanged: 8,
        BotMelee: 16, BotRanged: 32
    };
    return {
        TopMelee: Boolean(status & mask.TopMelee), TopRanged: Boolean(status & mask.TopRanged),
        MidMelee: Boolean(status & mask.MidMelee), MidRanged: Boolean(status & mask.MidRanged),
        BotMelee: Boolean(status & mask.BotMelee), BotRanged: Boolean(status & mask.BotRanged)
    }
}

export interface RaxStatus {
    TopMelee: boolean, TopRanged: boolean,
    MidMelee: boolean, MidRanged: boolean,
    BotMelee: boolean, BotRanged: boolean,
}

export enum GameMode {
    NONE=0,
    ALL_PICK=1,
    CAPTAINS_MODE=2,
    RANDOM_DRAFT=3,
    SINGLE_DRAFT=4,
    ALL_RANDOM=5,
    INTRO=6,
    DIRETIDE=7,
    REVERSE_CAPTAINS_MODE=8,
    THE_GREEVILING=9,
    TUTORIAL=10,
    MID_ONLY=11,
    LEAST_PLAYED=12,
    NEW_PLAYER_POOL=13,
    COMPENDIUM_MATCHING=14,
    COOP_VS_BOTS=15,
    CAPTAINS_DRAFT=16,
    ABILITY_DRAFT=18,
    ALL_RANDOM_DEATHMATCH=20,
    MID_ONLY_1V1=21,
    RANKED_MATCHMAKING=22,
    TURBO_MODE=23,
}

export enum Engine {
    SOURCE1=0,
    SOURCE2=1
}