#!/usr/bin/env node
import { promises } from 'fs';
import mongoose from 'mongoose';
import { matchFromJson, MatchSummaryModel } from './types/Matches';

import { getMatches } from './APIRequests';

async function testMatch() {
    const data = await promises.readFile(
        './test/fixtures/sampleMatch.json', {encoding: 'utf-8'}
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

async function testMongo() {
    await mongoose.connect(
        process.env.MONGO_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "abilityDraft"
        }
    );
    const matches = await getMatches();
    await MatchSummaryModel.create(matches[0]);
    await mongoose.connection.close();
}

// testMatch().then(() => console.log('done'));
// testGetMatches().then(() => console.log('done'));
testMongo().then(() => console.log('done'));
