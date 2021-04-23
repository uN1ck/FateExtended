import {IItem} from "../data/IItem";
import Constants from "../constants";
import {FateItem} from "./FateItem";
import {StateKeeper} from "../util/StateKeeper";

interface IState {
    isEditModeActive: boolean;
}

/**
 * Корневой класс для всех листов предметов в системе.
 *
 * @template T - класс-описание внутренней структуры данных.
 * @template E - entity-класс, хранимый в БД Foundry.
 */
export abstract class FateItemSheet<Data extends IItem, Entity extends FateItem<Data>>
    extends ItemSheet<Item.Data<Data>, Entity> {

    get template(): string {
        return `${Constants.TEMPLATES_ROOT_PATH}item/${this.item.data.type}/sheet.hbs`;
    }

    get messageTemplate(): string{
        return `${Constants.TEMPLATES_ROOT_PATH}item/${this.item.data.type}/message.hbs`
    }

    protected stateKeeper: StateKeeper<IState> =
        new StateKeeper<IState>({isEditModeActive: false},
            [this._onStateChanged])

    protected _onStateChanged() {
        this.render(true);
    }
}