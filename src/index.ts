import { promises } from 'fs';
import { matchFromJson } from './types/Matches';

async function testMatch() {
    const data = await promises.readFile(
        './test/sampleMatch.json', {encoding: 'utf-8'}
    ).then(
        data => JSON.parse(data)
    );
    console.log(matchFromJson(data));
}

testMatch().then(() => console.log('done'));