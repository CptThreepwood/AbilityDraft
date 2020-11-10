
import mongoose from 'mongoose';
import { MatchSummary, MatchSummaryModel } from './types/Matches';

import { getMatchesSequence } from './APIRequests';
import { logger } from './logger';

async function createMatchIfMissing(match: MatchSummary): Promise<boolean> {
    const exists = await MatchSummaryModel.exists({ _id: match._id} );
    if (exists) { return false };
    await MatchSummaryModel.create(match);
    return true;
}

// I think matches are created faster than we can scrape them this way
// I'm going to run it for a while and see
async function scrapeMatches(id: number | undefined): Promise<number> {
    logger.info(`Getting next batch from ${id}`)
    const matches = await getMatchesSequence(id);
    const max_seq_id = Math.max(...matches.map(m => m.match_seq_num));

    const inserts = await Promise.all(matches.map(createMatchIfMissing)).then(
        (successes) => successes.reduce((acc, cur) => acc + (cur ? 1: 0), 0)
    );
    // Always at least one identical ID because we don't know the next seq num to request
    if (inserts < (matches.length - 1)) {
        console.warn(`Inserted ${inserts} of ${matches.length} matches`);
    }
    return max_seq_id;
}

// Use an explicit loop rather than recursing
// I'm not sure I trust the recursion in JS and this makes logging clearer
async function scrapeMatchesController(start_id: number | undefined) {
    let next_id = await scrapeMatches(start_id)
    while (next_id != start_id) {
        start_id = next_id;
        await setTimeout(() => logger.info(`Sleeping for ${next_id}`), 1000);
        next_id = await scrapeMatches(start_id);
    }
    logger.info('Done scrapping');
}

// Scrape full Dota2 match history by sequence number if called directly
if (require.main === module) {
    mongoose.connect(
        process.env.MONGO_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "abilityDraft"
        }
    ).then(
        async () => MatchSummaryModel.find().sort({match_seq_num:-1}).limit(1)
    ).then(
        (latestMatch) => scrapeMatchesController(latestMatch[0]?.match_seq_num)
    ).then(
        () => mongoose.connection.close()
    );
}
