import { Ability } from "./types/Abilities";
import { promises } from "fs";
import { generate } from "pegjs";

const ABILTIES_DATA = './src/data/npc_abilities.txt';
const GRAMMAR = './src/data/abilitiesGrammar.pegjs';

async function generateParser(grammarFile: string = GRAMMAR) {
    const grammar = await promises.readFile(grammarFile, 'ascii');
    return generate( grammar, { output: 'parser' } );
}

async function parseDotaAbilityData(raw: string, grammarFile: string): Promise<Ability[]> {
    const parser = await generateParser(grammarFile)
    try {
        const npc_abilities = parser.parse(raw);
        console.log(npc_abilities);
        return Object.keys(npc_abilities['DOTAAbilities']).map(
            key => makeAbility(key, npc_abilities['DOTAAbilities'][key])
        ).filter(
            (x): x is Ability => x !== undefined
        );
    } catch (ex) {
        console.log(ex);
        throw ex
    }
}

function makeAbility(name: string, data: string | any): Ability | undefined {
    if (typeof data === "string") { return undefined; }
    return { id: parseInt(data["ID"]), name: (data["name"] ? data["name"]: name) };
}

export async function getAbilities(dataFile: string = ABILTIES_DATA, grammarFile: string = GRAMMAR): Promise<Ability[]> {
    const rawAbilityString = await promises.readFile(dataFile, 'ascii');
    return parseDotaAbilityData(rawAbilityString, grammarFile);
}