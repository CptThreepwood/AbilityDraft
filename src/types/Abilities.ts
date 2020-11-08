import abilities from '../data/abilities.json';
import {logger} from '../logger';

export interface AbilityUpgrade {
    ability: Ability,
    time: number,
    level: number
}

export function abilityUpgradeFromJson(json: any): AbilityUpgrade {
    console.log(json);
    console.log(getAbility(json.ability));
    return {...json, ability: getAbility(json.ability)}
}

export interface Ability {
    name: string, id: number | null, englishName: string,
}

export function getAbility(id: number): Ability | undefined {
    const ability = abilities.find(ability => ability.id == id);
    if (ability === undefined) {logger.warn(`Ability ID ${id} not found`);}
    return ability;
}