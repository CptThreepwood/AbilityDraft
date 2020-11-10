import mongoose from 'mongoose';
import { MatchModel, Match, MatchSummaryModel, MatchSummary } from './types/Matches';

import { getMatch } from './APIRequests';
import { logger } from './logger';

async function createMatchIfMissing(match: Match): Promise<boolean> {
    const exists = await MatchModel.exists({ _id: match._id} );
    if (exists) {
        await MatchSummaryModel.updateOne({_id: match._id}, {detailScrapped: true});
        return false
    };
    await MatchModel.create(match);    
    await MatchSummaryModel.updateOne({_id: match._id}, {detailScrapped: true});
    return true;
}

// I think matches are created faster than we can scrape them this way
// I'm going to run it for a while and see
async function scrapeMatch(summary: MatchSummary): Promise<void> {
    logger.info(`Getting match detials for ${summary._id}`)
    await getMatch(summary._id).then(createMatchIfMissing);
}

// Use an explicit loop rather than recursing
// I'm not sure I trust the recursion in JS and this makes logging clearer
async function scrapeMatchController() {
    const unscrappedMatches = await MatchSummaryModel.find({'detailScrapped': false})
    for (let match of unscrappedMatches) {
        logger.info(`Downloading match details for ${match._id}`);
        await scrapeMatch(match);
        await setTimeout(() => {}, 1000);
    }
    await Promise.all(unscrappedMatches.map(scrapeMatch))
    logger.info('Done scrapping');
}

// Scrape missing matches if called directly
if (require.main === module) {
    mongoose.connect(
        process.env.MONGO_URI as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "abilityDraft"
        }
    ).then(
        () => scrapeMatchController()
    ).then(
        () => mongoose.connection.close()
    );
}