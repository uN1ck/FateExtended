import {FateItemSheet} from "../FateItemSheet";
import {IAspect} from "../../data/IAspect";
import {Aspect} from "./Aspect";

export class AspectSheet extends FateItemSheet<IAspect, Aspect> {

    static get defaultOptions(): BaseEntitySheet.Options {
        return mergeObject(super.defaultOptions,
            {
                height: 270,
                width: 300,
                resizable: true
            } as DeepPartial<BaseEntitySheet.Options>) as BaseEntitySheet.Options;
    }

    // activateListeners(html: JQuery) {
    //     html.find("#aspect-name-value")
    //         .on("change", (event: JQuery.ChangeEvent) => {
    //         const newValue:string = event.target.value;
    //         this.item.
    //         this.item.keepData({})
    //     })
    //     html.find("#aspect-label-value")
    //         .on("change", (event: JQuery.ChangeEvent) => {
    //         const newValue:string = event.target.value;
    //     })
    //     html.find("#aspect-description-value")
    //         .on("change", (event: JQuery.ChangeEvent) => {
    //         const newValue:string = event.target.value;
    //     })
    // }

    getData(options?: any): Promise<Item.Data<IAspect>> | Item.Data<IAspect> {
        const superData = super.getData(options);

        const mergedData = {
            ...superData, localization: {
                label: "LBL",
                name: "NME",
                description: "DSCR",
            }
        };
        console.log("RETURNAL DATA", mergedData)
        return mergedData;
    }

}