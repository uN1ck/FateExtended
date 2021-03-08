import Constants from '../../constants';
import {FateActor} from "./FateActor";


export class FateActorSheet extends ActorSheet<ActorSheet.Data, FateActor> {
    static get defaultOptions() {
        const options = super.defaultOptions;

        if (!options.classes) {
            options.classes = [];
        }

        // @ts-ignore
        return mergeObject(options, {
            classes: ["sheet", "actor"],
            template: "systems/" + Constants.MODULE_NAME + "/templates/actor-sheet.html",
            width: 600,
            height: 600,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    getData() {
        const data = super.getData();

        return data;
    }

    activateListeners(html: JQuery) {
        super.activateListeners(html);
        if (!this.options.editable) return;

        html.find('button#give-fate-point').on("click", this.handleGiveFatePoint.bind(this))
    }

    async handleGiveFatePoint(eventArg) {

        const data = this.actor.data.data;
        const actor = this.actor;

    }
}
