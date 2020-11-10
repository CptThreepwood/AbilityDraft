import { prop } from '@typegoose/typegoose';

import abilities from '../data/abilities.json';
import { logger } from '../logger';

export interface I_AbilityUpgrade {
    time: number,
    level: number,
    ability: number,
}

export class AbilityUpgrade {
    constructor(data: I_AbilityUpgrade) {
        this.time = data.time;
        this.level = data.level;
        this.ability = new Ability(data.ability)
    }

    @prop()
    ability: Ability

    @prop()
    time: number

    @prop()
    level: number
}

export class Ability {
    constructor(id: number | null) {
        const ability = abilities.find(ability => ability.id == id);
        if (ability === undefined) {
            logger.warn(`Ability ID ${id} not found`);
            this.id = id;
            this.name = 'Not Found';
            this.englishName = 'Not Found';
            return;
        }
        this.id = ability.id;
        this.name = ability.name;
        this.englishName = ability.englishName;
    }

    @prop()
    name: string

    @prop()
    id: number | null

    @prop()
    englishName: string
}