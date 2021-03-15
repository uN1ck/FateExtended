import {IAspect} from "./IAspect";

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

export interface IItemData<D> extends Item.Data<D> {
    //TODO: Impl
}