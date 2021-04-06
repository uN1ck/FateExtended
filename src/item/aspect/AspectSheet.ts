import {FateItemSheet} from "../FateItemSheet";
import {IAspect} from "../../data/IAspect";
import {Aspect} from "./Aspect";

export class AspectSheet extends FateItemSheet<IAspect, Aspect> {

    activateListeners(html: JQuery) {
        //super.activateListeners(html);

        html.find("#aspect-label-value").on("change", (event) => {
            console.log("CHNG", event)
        })

    }


    getData(options?: any): Promise<Item.Data<IAspect>> | Item.Data<IAspect> {
        const superData = super.getData(options);

        const mergedData = {
            ...superData, localization: {
                label: "LBL",
                name: "NME",
                description: "DSCR",
            }
        };
        return mergedData;
    }

}