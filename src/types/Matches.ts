import { getModelForClass, prop } from "@typegoose/typegoose"

import { Player } from './Players';
import { Hero } from './Heroes';
import { TowerStatus, RaxStatus } from './Buidling';

import { 
    APIResponse_Match_PickBan,
    APIResponse_MatchSummary_Match,
    APIResponse_Match_Match,
} from './APIResponses';

// ---------------------------------------------------------------------------------------------
// MatchSummary

export class MatchSummary {
    constructor(matchSummary: APIResponse_MatchSummary_Match) {
        this._id = matchSummary.match_id;
        this.match_seq_num = matchSummary.match_seq_num;
        this.start_time = matchSummary.start_time;
        this.lobby_type = matchSummary.lobby_type;
        this.heroes = matchSummary.players.map(p => new Hero(p.hero_id))
        this.detailScrapped = false;
    }

    @prop()
    _id: number

    @prop()
    match_seq_num: number

    @prop()
    start_time: number

    @prop()
    lobby_type: number

    @prop( {type: [Hero]})
    heroes: Hero[]

    @prop()
    detailScrapped: boolean
}

export const MatchSummaryModel = getModelForClass(MatchSummary);

// ---------------------------------------------------------------------------------------------
// Full Match Detail

export class Pick {
    constructor(pickban: APIResponse_Match_PickBan) {
        this.is_pick = pickban.is_pick;
        this.team = pickban.team;
        this.hero = new Hero(pickban.hero_id);
        this.order = pickban.order;
    }

    // True if pick, false if ban
    @prop()
    is_pick: boolean

    @prop()
    team: Team

    @prop()
    hero: Hero

    @prop()
    order: number
}

export class Match {
    constructor(match: APIResponse_Match_Match) {
        this.players = match.players?.map(p => new Player(p)) || [],
        this.tower_status_radiant = new TowerStatus(match.tower_status_radiant),
        this.tower_status_dire = new TowerStatus(match.tower_status_dire),
        this.barracks_status_radiant = new RaxStatus(match.barracks_status_dire),
        this.barracks_status_dire = new RaxStatus(match.barracks_status_dire),
        this.picks_bans = match.picks_bans?.map((p: any) => new Pick(p)) || [],

        // Boring property initialisation - There's probably a better pattern
        this._id = match.match_id;
        this.radiant_win = match.radiant_win;
        this.duration = match.duration;
        this.pre_game_duration = match.pre_game_duration;
        this.start_time = match.start_time;
        this.match_seq_num = match.match_seq_num;
        this.cluster = match.cluster;
        this.first_blood_time = match.first_blood_time;
        this.lobby_type = match.lobby_type;
        this.human_players = match.human_players;
        this.leagueid = match.leagueid;
        this.positive_votes = match.positive_votes;
        this.negative_votes = match.negative_votes;
        this.game_mode = match.game_mode;
        this.flags = match.flags;
        this.engine = match.engine;
        this.radiant_score = match.radiant_score;
        this.dire_score = match.dire_score;
    }

    @prop({type: [Player]})
    players: Player[]

    @prop()
    radiant_win: boolean

    // Length of the match in seconds
    @prop()
    duration: number
    @prop()
    pre_game_duration: number

    // Unix timestamp for the time at which the game started
    @prop()
    start_time: number

    // Unique ID for this match
    @prop()
    _id: number

    // Unique incrementing ID for this match
    @prop()
    match_seq_num: number

    // Final Tower Status
    @prop()
    tower_status_radiant: TowerStatus
    @prop()
    tower_status_dire: TowerStatus

    // Final Barracks Status
    @prop()
    barracks_status_radiant: RaxStatus
    @prop()
    barracks_status_dire: RaxStatus
    @prop()
    cluster: number

    // Time in seconds at which first blood occured
    @prop()
    first_blood_time: number

    // Whether the lobby is public/private/other
    @prop()
    lobby_type: LobbyType

    // Number of human players
    @prop()
    human_players: number

    // ID of league this game was played in. 0 if no league.
    @prop()
    leagueid: number

    // Community opinion of game
    @prop()
    positive_votes: number
    @prop()
    negative_votes: number

    // Type of dota game being played
    @prop()
    game_mode: GameMode

    // Unknown what flags are
    @prop()
    flags: number

    // Source 1 vs Source 2
    @prop()
    engine: Engine

    // Radiant and Dire total kills
    @prop()
    radiant_score: number
    @prop()
    dire_score: number

    // Ordered list of picks and bans
    @prop({type: [Pick]})
    picks_bans: Pick[]
}

export enum Team {
    RADIANT=0, DIRE=1
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

export const MatchModel = getModelForClass(Match);