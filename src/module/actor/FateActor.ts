import {FateItem} from "../item/FateItem";

export class FateActor<T, D, I extends Item = FateItem<D>> extends Actor<T, I> {
    prepareData() {
        super.prepareData();

        const actorData = this.data;
        const data = actorData.data;
        const flags = actorData.flags;

        console.log("Actor Done", data, flags)

    }
}