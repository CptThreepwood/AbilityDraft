import { promises } from 'fs';
import { matchFromJson } from './types/Matches';

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

testMatch().then(() => console.log('done'));