import Constants from '../../constants';
import {FateActor} from "./FateActor";
import {GiveFatePointDialogFactory} from "../components/GiveFatePointDialogFactory";

export class FateActorSheet extends ActorSheet<ActorSheet.Data<FateActor>, FateActor> {
    private dialogFactory: GiveFatePointDialogFactory = new GiveFatePointDialogFactory();

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

    async getData(): Promise<ActorSheet.Data> {
        const data = await super.getData();
        if (data.data.fate.points === 0)
            data.data.advancedInfo.isGiveFatePointButtonDisabled = "disabled";
        return data;
    }

    activateListeners(html: JQuery) {
        super.activateListeners(html);
        if (!this.options.editable) return;

        html.find('button#give-fate-point').on("click", this.handleGiveFatePoint.bind(this))
    }

    handleGiveFatePoint(eventArg) {
        this.dialogFactory.newDialog(this).then(dialog => dialog.render(true));
    }
}
