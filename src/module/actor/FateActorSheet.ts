import Constants from '../../constants';
import {FateActor} from "./FateActor";
import {createAspectDialog} from "../item/aspect/AspectComponents";
import {createGiveFatePointDialog} from "../components/GiveFatePointDialogFactory";

export class FateActorSheet extends ActorSheet<ActorSheet.Data<FateActor>, FateActor> {

    static get defaultOptions() {
        const options = super.defaultOptions;

        if (!options.classes) {
            options.classes = [];
        }

        // @ts-ignore
        return mergeObject(options, {
            classes: ["sheet", "actor"],
            template: "systems/" + Constants.MODULE_NAME + "/templates/actor/ActorSheet.html",
            width: 600,
            height: 600,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    async getData(): Promise<ActorSheet.Data<FateActor>> {
        const data = await super.getData();
        if (data.data.fate.points === 0)
            data.data.advancedInfo.isGiveFatePointButtonDisabled = "disabled";
        return data;
    }

    activateListeners(html: JQuery) {
        super.activateListeners(html);
        if (!this.options.editable) return;

        html.find('button#give-fate-point').on("click", this.handleGiveFatePoint.bind(this))

        html.find('button#add-aspect').on("click", this.handleCreateAspect.bind(this));
        // html.find('button#edit-aspect').on("click", this.handleEditAspect.bind(this));
        // html.find('button#delete-aspect').on("click", this.handleEditAspect.bind(this));
    }

    /* =============================================================================
     * Handlers
     ============================================================================= */

    handleGiveFatePoint(eventArg) {
        createGiveFatePointDialog(this.actor,
            () => {
                this.actor.update(this.actor.data)
                this.render(true);
            }).then(dialog => dialog.render(true));
    }

    async handleCreateAspect(eventArg) {
        const dialog = await createAspectDialog(newAspect => {
            console.log("LOL_DAN", newAspect)
        });
        dialog.render(true);
    }

    handleEditAspect(eventArg) {

    }

    handleDeleteAspect(eventArg) {

    }

}
