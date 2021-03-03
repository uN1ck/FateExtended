import {FateItem} from "../item/FateItem";
import Constants from "../../constants";
import {CONFIG_REFRESH_POINTS} from "../settings";
import {IStunt} from "../../data/Definitions";

export class FateActor<T, D, I extends Item = FateItem<D>> extends Actor<T, I> {
    prepareData() {
        super.prepareData();

        const actorData = this.data;
        console.log("Actor Data Here", actorData)
        const data = this._prepareCommonData(actorData.data)
        const flags = actorData.flags;

    }

    private _prepareCommonData(data: Object) {
        //todo: strict type for data?

        //FatePoints

        // @ts-ignore
        data.fate.refresh = game.settings.get(Constants.MODULE_NAME, CONFIG_REFRESH_POINTS);
        // @ts-ignore
        let refreshesLast = data.fate.refresh;

        //Stunts
        // @ts-ignore
        data.stunts = Object.values(data.stunts).map((item: IStunt) => {
            refreshesLast -= item.refreshCost;
        })
        // @ts-ignore
        data.info.name = data.name;

        return data;
    }

}