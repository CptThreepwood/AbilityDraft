import { MatchSummary } from './types/Matches';
import steam_config from './config/steam_key.secret.json';
import got from 'got';

import { APIResponse_MatchSummary } from './types/APIResponses';
import { logger } from './logger';

const API_TIMEOUT = 3000
const API_BASE = "https://api.steampowered.com/"
const MATCH_HISTORY = "IDOTA2Match_570/GetMatchHistory/V001"
const MATCH_SEQ_HISTORY = "IDOTA2Match_570/GetMatchHistoryBySequenceNum/V001"

export async function getMatches(): Promise<MatchSummary[]> {
    const matchesEndpoint = new URL(MATCH_HISTORY, API_BASE)
    matchesEndpoint.searchParams.append('key', steam_config.key);
    matchesEndpoint.searchParams.append('language', steam_config.language);
    matchesEndpoint.searchParams.append('format', 'JSON');
    matchesEndpoint.searchParams.append('min_players', '10');
    matchesEndpoint.searchParams.append('matches_requested', '100');
    // Game Mode filtering doesn't seem to work (otherwise this method would be preferred)
    // matchesEndpoint.searchParams.append('game_mode', '18');
    const response = await got(matchesEndpoint.toString(), {responseType: "json"});

    return (response.body as APIResponse_MatchSummary).result.matches.map(m => new MatchSummary(m));
}

export async function getMatchesSequence(from?: number): Promise<MatchSummary[]> {
    const matchesEndpoint = new URL(MATCH_SEQ_HISTORY, API_BASE)
    matchesEndpoint.searchParams.append('key', steam_config.key);
    matchesEndpoint.searchParams.append('language', steam_config.language);
    matchesEndpoint.searchParams.append('format', 'JSON');
    if (from) {
        matchesEndpoint.searchParams.append('start_at_match_seq_num', `${from}`);
    }
    matchesEndpoint.searchParams.append('matches_requested', '100');
    
    const response = await got(matchesEndpoint.toString(), {responseType: "json"});
    if (response.statusCode != 200) {
        await setTimeout(() => logger.info('Retrying request'), API_TIMEOUT);
        return getMatchesSequence(from);
    }

    return (response.body as APIResponse_MatchSummary).result.matches.map(m => new MatchSummary(m));
}

// Only get matches lobby_type == 0 (7 is Ranked and 12 seems to be something about events)