import items from "../data/items.json";
import { assert } from "console";


export function getItem(id: number): Item {
    // Is this what an undefined item ID means?
    if (id == 0 || id === undefined) {
        return {
            id: id, name: 'Empty', cost: 0,
            secret_shop: false, side_shop: false,
            recipe: false, localized_name: 'Empty'
        }
    }
    const item = items.filter(item => item.id == id);
    assert(item.length, `No Item found matching ${id}`);
    return {
        id: item[0].id,
        name: item[0].name,
        cost: item[0].cost,
        secret_shop: Boolean(item[0].secret_shop),
        side_shop: Boolean(item[0].side_shop),
        recipe: Boolean(item[0].recipe),
        localized_name: item[0].localized_name,
    };
}

export interface Item {
    id: number,
    name: string,
    cost: number,
    secret_shop: boolean,
    side_shop: boolean,
    recipe: boolean,
    localized_name: string
}