import { AbilityUpgrade } from './Abilities';
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

export interface Player {
    // Account ID to look up user info
    "account_id": number,
    // (1-5) (radiant || dire)
    "player_slot": PlayerSlot,
    // ID of the hero chosen
    "hero_id": Hero,
    // Item Slot Contents
    "item_0": Item,
    "item_1": Item,
    "item_2": Item,
    "item_3": Item,
    "item_4": Item,
    "item_5": Item,
    // Backpack Contents
    "backpack_0": Item | undefined,
    "backpack_1": Item | undefined,
    "backpack_2": Item | undefined,
    "item_neutral": Item | undefined,
    // Player K/D/A
    "kills": number,
    "deaths": number,
    "assists": number,
    // Whether and how the player left
    "leaver_status": LeaverStatus,
    // Last Hits and Deniews
    "last_hits":number,
    "denies": number,
    // GPM and XPM
    "gold_per_min": number,
    "xp_per_min": number,
    // Final Hero Level
    "level": number,
    // Total damage dealt to heroes
    "hero_damage": number,
    // Total damage dealt to towers
    "tower_damage": number,
    // Total healing done to heroes
    "hero_healing": number,
    // Net Worth
    "gold": number,
    // Net Worth Spent
    "gold_spent": number,
    // Not sure how scaling is applied, perhaps it's after all modifiers?
    "scaled_hero_damage": number,
    "scaled_tower_damage": number,
    "scaled_hero_healing": number,
    // List of abilities upgraded
    "ability_upgrades": AbilityUpgrade[]
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