import abilities from '../data/abilities.json';
import { assert } from 'console';

export function abilityUpgradeFromJson(json: any): AbilityUpgrade {
    console.log(json);
    console.log(getAbility(json.ability));
    return {...json, ability: getAbility(json.ability)}
}

export interface AbilityUpgrade {
    ability: Ability,
    time: number,
    level: number
}

export function getAbility(id: number): Ability {
    const ability = abilities.find(ability => ability.id == id);
    assert(ability, `Ability ID ${id} not found`);
    return ability ? ability : {name: "Unknown", id: -1, englishName: "Unknown"};
}

export interface Ability {
    name: string, id: number, englishName: string,
}