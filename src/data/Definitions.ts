export interface IAspect {
    label: string;
    name: string;
    description: string;
}

export interface ISkill {
    name: string;
    overcome: string;
    caa: string;
    attack: string;
    defend: string;
    value: number;
    modifiers: Array<ISkill>;
}

export interface IStunt {
    name: string;
    description: string;
    rollable: boolean;
    formula: string;
    refreshCost: number;
}

export interface IExtra {
    name: string;
    description: string;
    aspects: Array<IAspect>;
    skills: Array<ISkill>;
    stunts: Array<IStunt>;
    tracks: Array<ITrack>;
    usesParentSkills: boolean;
}

export interface ITrack {
    name: string;
    skill: string;
    slots: Array<ISlot>;
}

export interface ISlot {
    value: number;
    checked: boolean
}

export interface IActorData {
    aspects: Array<IAspect>;
    skills: Array<ISkill>;
    stunts: Array<IStunt>;
    extras: Array<IExtra>;
    tracks: Array<ITrack>;
    fate: {
        points: number,
        refresh: number,
    }
    info: {
        name: string;
        description: string,
    }
    advancedInfo?: {
        health: { max: number, real: number },
        refreshPointsLasts: number,
        skillPointsLasts: number
        [x: string]: any
    }
}

export interface IItemData extends Item.Data {
    //TODO: Impl
}