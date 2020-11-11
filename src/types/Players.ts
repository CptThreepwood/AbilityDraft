import { prop } from '@typegoose/typegoose';

import { Ability, AbilityUpgrade, I_AbilityUpgrade } from './Abilities';
import { APIResponse_Match_Player } from './APIResponses';
import { Hero } from './Heroes';
import { Item } from './Items';

export enum PlayerSlot {
    RADIANT1=0,
    RADIANT2=1,
    RADIANT3=2,
    RADIANT4=3,
    RADIANT5=4,
    DIRE1=128,
    DIRE2=129,
    DIRE3=130,
    DIRE4=131,
    DIRE5=132,
}

export class Player {
    constructor(player: APIResponse_Match_Player) {
        this.hero = new Hero(player.hero_id);
        this.item_0 = new Item(player.item_0);
        this.item_1 = new Item(player.item_1);
        this.item_2 = new Item(player.item_2);
        this.item_3 = new Item(player.item_3);
        this.item_4 = new Item(player.item_4);
        this.item_5 = new Item(player.item_5);
        this.backpack_0 = player.backpack_0 ? new Item(player.backpack_0) : new Item(undefined);
        this.backpack_1 = player.backpack_1 ? new Item(player.backpack_1) : new Item(undefined);
        this.backpack_2 = player.backpack_2 ? new Item(player.backpack_2) : new Item(undefined);
        this.item_neutral = player.item_neutral ? new Item(player.item_neutral) : new Item(undefined);
        this.ability_upgrades = player.ability_upgrades?.map((u: I_AbilityUpgrade) => new AbilityUpgrade(u)) || [];

        this.account_id = player.account_id;
        this.kills = player.kills;
        this.deaths = player.deaths;
        this.assists = player.assists;
        this.player_slot = player.player_slot;
        this.leaver_status = player.leaver_status;
        this.last_hits = player.last_hits;
        this.denies = player.denies;
        this.gold_per_min = player.gold_per_min;
        this.xp_per_min = player.xp_per_min;
        this.level = player.level;
        this.hero_damage = player.level;
        this.tower_damage = player.level;
        this.hero_healing = player.level;
        this.gold = player.level;
        this.gold_spent = player.level;
        this.scaled_hero_damage = player.level;
        this.scaled_tower_damage = player.level;
        this.scaled_hero_healing = player.level;
    }

    // Account ID to look up user info
    @prop()
    account_id: number | undefined

    // (1-5) (radiant || dire)
    @prop()
    player_slot: PlayerSlot

    // ID of the hero chosen
    @prop()
    hero: Hero

    // Item Slot Contents
    @prop()
    item_0: Item
    @prop()
    item_1: Item
    @prop()
    item_2: Item
    @prop()
    item_3: Item
    @prop()
    item_4: Item
    @prop()
    item_5: Item

    // Backpack Contents
    @prop()
    backpack_0: Item
    @prop()
    backpack_1: Item
    @prop()
    backpack_2: Item
    @prop()
    item_neutral: Item

    // Player K/D/A
    @prop()
    kills: number
    @prop()
    deaths: number
    @prop()
    assists: number

    // Whether and how the player left
    @prop()
    leaver_status: LeaverStatus | undefined

    // Last Hits and Deniews
    @prop()
    last_hits:number
    @prop()
    denies: number

    // GPM and XPM
    @prop()
    gold_per_min: number
    @prop()
    xp_per_min: number

    // Final Hero Level
    @prop()
    level: number

    // Total damage dealt to heroes
    @prop()
    hero_damage: number

    // Total damage dealt to towers
    @prop()
    tower_damage: number

    // Total healing done to heroes
    @prop()
    hero_healing: number

    // Net Worth
    @prop()
    gold: number

    // Net Worth Spent
    @prop()
    gold_spent: number

    // Not sure how scaling is applied, perhaps it's after all modifiers?
    @prop()
    scaled_hero_damage: number
    @prop()
    scaled_tower_damage: number
    @prop()
    scaled_hero_healing: number

    // List of abilities upgraded
    @prop({type: [AbilityUpgrade]})
    ability_upgrades: AbilityUpgrade[]
}

export enum LeaverStatus {
    // finished match, no abandon.
    NONE=0,
    // player DC, no abandon.
    DISCONNECTED=1,
    // player DC > 5min, abandoned.
    DISCONNECTED_TOO_LONG=2,
    // player DC, clicked leave, abandoned.
    ABANDONED=3,
    // player AFK, abandoned.
    AFK=4,
    // player never connected, no abandon.
    NEVER_CONNECTED=5,
    // player took too long to connect, no abandon.
    NEVER_CONNECTED_TOO_LONG=6,
}