import Constants from '../../constants';
import {IAspect, ISkill, IStunt} from "../../data/Definitions";

export class FateActorSheet extends ActorSheet {
    static get defaultOptions() {
        let obj = mergeObject(super.defaultOptions, {
            classes: ["sheet", "actor"],
            template: "systems/" + Constants.MODULE_NAME + "/templates/actor-sheet.html",
            width: 600,
            height: 600,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
        console.log("Data for sheet default", obj)
        return obj;
    }

    getData() {
        const data = super.getData();
        console.log("Data for Sheet", data)
        return data;
    }
}

export interface IFateActorData {
    aspects: Array<IAspect>;
    skills: Array<ISkill>;
    stunts: Array<IStunt>;
    extras: Array<Object>; //TODO: Extras?
}