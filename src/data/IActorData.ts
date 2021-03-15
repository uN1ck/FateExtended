import {IExtra, ISkill, IStunt, ITrack} from "./Definitions";
import {IAspect} from "./IAspect";

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

export class ActorData implements IActorData {
    aspects: Array<IAspect>;
    extras: Array<IExtra>;
    fate: { points: number; refresh: number };
    info: { name: string; description: string; [p: string]: any };
    skills: Array<ISkill>;
    stunts: Array<IStunt>;
    tracks: Array<ITrack>;
}