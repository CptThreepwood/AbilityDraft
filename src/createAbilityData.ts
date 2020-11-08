import { Ability } from "./types/Abilities";
import { promises } from "fs";
import { generate } from "pegjs";

// https://github.com/SteamDatabase/GameTracking-Dota2/game/dota/scripts/npc/npc_abilities.txt
// https://raw.githubusercontent.com/SteamDatabase/GameTracking-Dota2/master/game/dota/pak01_dir/resource/localization/abilities_english.txt

const ENGLISH_NAMES     = "./config/abilityRaw/abilities_english.txt";
const GRAMMAR           = './config/abilityRaw/abilitiesGrammar.pegjs';
const ABILTIES_DATA     = './config/abilityRaw/npc_abilities.txt';
const DEFAULT_OUTPUT    = './build/data/abilities.json';

type NameLookup = {[id: string]: string}
async function readEnglishAbilities(): Promise<NameLookup> {
    const english = await promises.readFile(ENGLISH_NAMES, 'ascii');
    return english.match(/"DOTA_Tooltip_ability_.*/gm)?.reduce(
        (acc: NameLookup, line) => {
            const tokens = line.split('\t').filter(a => Boolean(a))
            acc[tokens[0].substring(22).replace(/"/g, "")] = tokens[1]?.replace(/"/g, "");
            return acc;
        }, {}
    ) || {}   
}

async function generateParser(grammarFile: string = GRAMMAR) {
    const grammar = await promises.readFile(grammarFile, 'ascii');
    return generate( grammar, { output: 'parser' } );
}

async function parseDotaAbilityData(raw: string, grammarFile: string): Promise<Ability[]> {
    const parser = await generateParser(grammarFile);
    const englishNames = await readEnglishAbilities();
    try {
        const npc_abilities = parser.parse(raw)['DOTAAbilities'];
        return Object.keys(npc_abilities).reduce(
            (acc: Ability[], key) => {
                if (typeof npc_abilities[key] === "string") { return acc; }
                return acc.concat({
                    id: parseInt(npc_abilities[key]["ID"]),
                    name: key, englishName: englishNames[key] || 'Unknown'
                });
            }, []
        );
    } catch (ex) {
        console.log(ex);
        throw ex
    }
}

async function createAbilities(
    dataFile: string = ABILTIES_DATA,
    grammarFile: string = GRAMMAR,
    outputAbilities: string = DEFAULT_OUTPUT,
) {
    const rawAbilityString = await promises.readFile(dataFile, 'ascii');
    return parseDotaAbilityData(rawAbilityString, grammarFile).then(
        abilties => promises.writeFile(outputAbilities, JSON.stringify(abilties, null, 2))
    );
}

// Create Ability file if called directly
if (require.main === module) {
    createAbilities();
}
