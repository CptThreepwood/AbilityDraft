export function abilityUpgradeFromJson(json: any): AbilityUpgrade {
    return {...json}
}

export interface AbilityUpgrade {
    ability: number,
    time: number,
    level: number
}