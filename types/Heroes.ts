import heroes from '../data/heroes.json';
import { assert } from 'console';

export function getHero(id: number): Hero {
    const hero = heroes.filter(hero => hero.id == id);
    assert(hero.length, `Hero ID ${id} not found`);
    return hero[0];
}

export interface Hero {
    name: string,
    id: number,
    localized_name: string
}