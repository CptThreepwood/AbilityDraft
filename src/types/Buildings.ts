import { prop } from '@typegoose/typegoose';

export class TowerStatus {
    constructor(status: number) {
        const mask = {
            Top1: 1, Top2: 2, Top3: 4,
            Mid1: 8, Mid2: 16, Mid3: 32,
            Bot1: 64, Bot2: 128, Bot3: 256,
            Top4: 512, Bot4: 1024
        };
        this.MidTier1 = Boolean(status & mask.Mid1);
        this.MidTier2 = Boolean(status & mask.Mid2);
        this.MidTier3 = Boolean(status & mask.Mid3);
        this.TopTier1 = Boolean(status & mask.Top1);
        this.TopTier2 = Boolean(status & mask.Top2);
        this.TopTier3 = Boolean(status & mask.Top3);
        this.TopTier4 = Boolean(status & mask.Top4);
        this.BotTier1 = Boolean(status & mask.Bot1);
        this.BotTier2 = Boolean(status & mask.Bot2);
        this.BotTier3 = Boolean(status & mask.Bot3);
        this.BotTier4 = Boolean(status & mask.Bot4);
    }

    @prop()
    MidTier1: boolean
    @prop()
    MidTier2: boolean
    @prop()
    MidTier3: boolean

    @prop()
    TopTier1: boolean
    @prop()
    TopTier2: boolean
    @prop()
    TopTier3: boolean
    @prop()
    TopTier4: boolean

    @prop()
    BotTier1: boolean
    @prop()
    BotTier2: boolean
    @prop()
    BotTier3: boolean
    @prop()
    BotTier4: boolean
}

export class RaxStatus {
    constructor(status: number) {
        const mask = {
            TopMelee: 1, TopRanged: 2,
            MidMelee: 4, MidRanged: 8,
            BotMelee: 16, BotRanged: 32
        };
        this.TopMelee = Boolean(status & mask.TopMelee);
        this.TopRanged = Boolean(status & mask.TopRanged);
        this.MidMelee = Boolean(status & mask.MidMelee);
        this.MidRanged = Boolean(status & mask.MidRanged);
        this.BotMelee = Boolean(status & mask.BotMelee);
        this.BotRanged = Boolean(status & mask.BotRanged);
    }
    @prop()
    TopMelee: boolean
    @prop()
    TopRanged: boolean

    @prop()
    MidMelee: boolean
    @prop()
    MidRanged: boolean

    @prop()
    BotMelee: boolean
    @prop()
    BotRanged: boolean
}