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
    const ability = abilities.filter(ability => ability.id == id);
    assert(ability.length, `Ability ID ${id} not found`);
    return ability[0];
}

export interface Ability {
    name: string, id: number
}