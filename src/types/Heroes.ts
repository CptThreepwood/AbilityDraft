import { prop } from '@typegoose/typegoose';
import heroes from '../data/heroes.json';
import { logger } from '../logger';

export class Hero {
    constructor(id?: number) {
        const hero = heroes.find(hero => hero.id == id);
        if (hero === undefined) {
            logger.warn(`Hero ID ${id} not found`);
            this.name = "unknown";
            this.id = id === undefined ? -1 : id;
            this.localized_name = "Unknown";
            return;
        }
        this.name = hero.name;
        this.id = hero.id;
        this.localized_name = hero.localized_name;
    }

    @prop()
    name: string

    @prop()
    id: number

    @prop()
    localized_name: string
}