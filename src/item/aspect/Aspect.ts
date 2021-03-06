import {FateItem} from "../FateItem";
import {IAspect} from "../../data/IAspect";


export class Aspect extends FateItem<IAspect> {
    prepareData() {
        super.prepareData();
    }

    public async keepData(newData: DeepPartial<IAspect>) {
        await this.update({data: newData})
    }

}