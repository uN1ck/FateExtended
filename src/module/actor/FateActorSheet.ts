import Constants from '../../constants';
import {IActorData} from "../../data/Definitions";
import {giveFatePointDialog} from "./GiveFatePointDialog";


export class FateActorSheet<T extends IActorData> extends ActorSheet<T> {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["sheet", "actor"],
            template: "systems/" + Constants.MODULE_NAME + "/templates/actor-sheet.html",
            width: 600,
            height: 600,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    getData() {
        const data = super.getData();
        let actorData: IActorData = data.data;
        return data;
    }

    protected activateListeners(html: JQuery) {
        super.activateListeners(html);
        if (!this.options.editable) return;

        html.find('button#give-fate-point').on("click", this.handleGiveFatePoint.bind(this))
    }

    handleGiveFatePoint(eventArg) {
        console.log("EVARG", eventArg)
        const data = super.getData();
        let actorData: IActorData = data.data;

        let d = giveFatePointDialog();
        d.render(true);
    }
}
