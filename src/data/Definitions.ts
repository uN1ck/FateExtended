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
}

export interface IItemData {
    //TODO: Impl
}