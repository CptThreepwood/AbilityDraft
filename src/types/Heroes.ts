import { prop } from 'typegoose';
import heroes from '../data/heroes.json';
import { logger } from '../logger';

export class Hero {
    constructor(id?: number) {
        const hero = heroes.find(hero => hero.id == id);
        if (hero === undefined) {
            logger.warn(`Hero ID ${id} not found`);
            this.name = "empty_hero";
            this.id = -1;
            this.localized_name = "Empty Hero"
        }
        return hero[0];
    }

    @prop()
    name: string

    @prop()
    id: number

    @prop()
    localized_name: string
}