import { Match, matchFromJson } from './types/Matches';
import steam_config from './config/steam_key.secret.json';
import got from 'got';

import { promises } from 'fs';
import { APIResponse_MatchSummary } from './types/APIResponses';

const API_BASE = "https://api.steampowered.com/"
const MATCH_HISTORY = "IDOTA2Match_570/GetMatchHistory/v1"

export async function getMatches(): Promise<Match[]> {
    const matchesEndpoint = new URL(MATCH_HISTORY, API_BASE)
    matchesEndpoint.searchParams.append('key', steam_config.key);
    matchesEndpoint.searchParams.append('language', steam_config.language);
    matchesEndpoint.searchParams.append('format', 'JSON');
    matchesEndpoint.searchParams.append('matches_requested', '500');
    
    const response = await got(matchesEndpoint.toString(), {responseType: "json"});
    promises.writeFile('./test/rawResponse.json', JSON.stringify(response.body));

    return (response.body as APIResponse_MatchSummary).result.matches.map(matchFromJson);
}