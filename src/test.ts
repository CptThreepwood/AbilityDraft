import { promises } from 'fs';
import { matchFromJson } from './types/Matches';

import { getMatches } from './APIRequests';

async function testMatch() {
    const data = await promises.readFile(
        './test/sampleMatch.json', {encoding: 'utf-8'}
    ).then(
        data => JSON.parse(data)
    );
    const parsedMatch = matchFromJson(data);
    console.log(parsedMatch);
    await promises.writeFile('./test/parsedMatch.json', JSON.stringify(parsedMatch));
}

async function testGetMatches() {
    const data = await getMatches();
    await promises.writeFile('./test/retrievedMatches.json', JSON.stringify(data));
}

// testMatch().then(() => console.log('done'));
testGetMatches().then(() => console.log('done'));