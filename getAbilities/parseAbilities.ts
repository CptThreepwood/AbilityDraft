import { Ability } from "./types/Abilities";
import { writeFileSync } from "fs";

type AbilityData = {[key: string]: string | AbilityData}

export function parseDotaAbilityData(raw: string): AbilityData {
    const lexed = raw.split('\n').map(
        // Remove comments
        line => (line.indexOf('//') == -1 ? line : line.substring(0, line.indexOf('//'))).trim()
    ).filter(line => line != '').reduce(
        // Split lines by tabs to get all tokens
        (acc: string[], cur) => acc.concat(cur.split('\t').filter(token => token != '')), []
    );
    writeFileSync('./test_lex.json', JSON.stringify(lexed))
    return parse(lexed)[0];
}

// Parse returns the data it found and the remaining tokens
function parse(tokens: string[]): [AbilityData, string[]] {
    let elems = {};
    
    let first = tokens.shift();
    while (first != '}' && first != undefined) {
        let second = tokens.shift();
        if (second == undefined) {
            throw Error ("Premature EOF");
        } else if (second == '{') {
            let content = {};
            // Update our tokens based on the fact that parse ate some
            [content, tokens] = parse(tokens);
            elems = {...elems, [first.substring(1, first.length-1)]: content}
        } else if (second.startsWith('"')) {
            elems = {...elems, [first.substring(1, first.length-1)]: second.substring(1, second.length-1)}
        }
        first = tokens.shift();
    }
    return [elems, tokens];
}

function makeAbility(name: string, data: AbilityData | string): Ability | undefined {
    if (typeof data === "string") {
        return undefined;
    } else if (typeof data.ID === "string") {
        return { id: parseInt(data.ID), name };
    }
    return undefined;
}

export function getAbilities(data: AbilityData): Ability[] {
    const abilities = data.DOTAAbilities;
    if (typeof abilities == "string") {
        throw Error("No Ability Data Found");
    }
    return Object.keys(abilities).map(
        key => makeAbility(key, abilities[key])
    ).filter((x): x is Ability => x !== undefined);
}