import { promises } from 'fs';
import { matchFromJson } from './types/Matches';
import { getAbilities } from './parseAbilities';

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



function testParser() {
    getAbilities().then(
        abilities => promises.writeFile('test.json', JSON.stringify(abilities))
    )
}

testParser();
// testMatch().then(() => console.log('done'));