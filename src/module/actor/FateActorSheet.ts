import Constants from '../../constants';
import {IActorData, IAspect, ISkill, IStunt} from "../../data/Definitions";


export class FateActorSheet<T extends IActorData> extends ActorSheet<T> {
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
        let actorData: IActorData = data.data;
        console.log("Actor Data for Sheet", actorData)

        return data;
    }

    protected activateListeners(html: JQuery | HTMLElement) {
        super.activateListeners(html);

        if (!this.options.editable) return;

    }
}