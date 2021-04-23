import {IExtra, ISkill, IStunt, ITrack} from "./Definitions";
import {IAspect} from "./IAspect";

export interface IActor {
    aspects: Array<IAspect>;
    skills: Array<ISkill>;
    stunts: Array<IStunt>;
    extras: Array<IExtra>;
    tracks: Array<ITrack>;
    info: {
        description: string;
    }
    fate: {
        points: number;
    }
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
        [x: string]: any
    }
    advancedInfo?: {
        health: { max: number, real: number },
        refreshPointsLasts: number,
        skillPointsLasts: number
        [x: string]: any
    }
}