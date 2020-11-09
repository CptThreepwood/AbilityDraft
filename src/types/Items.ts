import { prop } from 'typegoose';

import items from "../data/items.json";
import { logger } from '../logger';

export class Item {
    constructor(id?: number) {
        if (id == 0 || id === undefined) {
            this.id = 0;
            this.name = 'Empty';
            this.cost = 0;
            this.secret_shop = false;
            this.side_shop = false;
            this.recipe = false;
            this.localized_name = 'Empty';
            return;
        }
        const item = items.find(item => item.id == id);
        // Is this what an undefined item ID means?
        if (item === undefined) {
            logger.warn(`Item ${id} not found`)
            this.id = id;
            this.name = 'Not Found',
            this.cost = -1
            this.secret_shop = false;
            this.side_shop = false;
            this.recipe = false;
            this.localized_name = 'Not Found';
            return;
        }
        this.id = item.id;
        this.name = item.name;
        this.cost = item.cost;
        this.secret_shop = Boolean(item.secret_shop);
        this.side_shop = Boolean(item.side_shop);
        this.recipe = Boolean(item.recipe);
        this.localized_name = item.localized_name;
    }

    @prop()
    id: number

    @prop()
    name: string

    @prop()
    cost: number

    @prop()
    secret_shop: boolean

    @prop()
    side_shop: boolean

    @prop()
    recipe: boolean

    @prop()
    localized_name: string
}