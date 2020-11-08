import abilities from '../data/abilities.json';

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

export interface Ability {
    name: string, id: number | null, englishName: string,
}

export function getAbility(id: number): Ability | undefined {
    const ability = abilities.find(ability => ability.id == id);
    // logger.warn(ability, `Ability ID ${id} not found`);
    return ability;
}