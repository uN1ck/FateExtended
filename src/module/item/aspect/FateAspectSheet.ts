import supports = CSS.supports;
import {IAspect} from "../../../data/IAspect";

export class FateAspectSheet extends ItemSheet<ItemSheet.Data<IAspect>,IAspect> {
    static get defaultOptions() {
        return super.defaultOptions;
    }

    activateListeners(html: JQuery) {
        super.activateListeners(html);

        html.find("input#aspect.label").on("change", this.onLabelChanged)
        html.find("input#aspect.name").on("change", this.onNameChanged)
        html.find("textarea#aspect.description").on("change", this.onDescriptionChanged)
    }


    getData(options?: any): Promise<ActorSheet.Data<Actor>> | ActorSheet.Data<Actor> {
        return super.getData(options);
    }

//================================
    //region handlers

    private onLabelChanged(e, sheet) {

    }

    private onNameChanged(e, sheet) {

    }

    private onDescriptionChanged(e, sheet) {

    }

    //endregion
    //================================
}