import {IItem} from "../data/IItem";
import Constants from "../constants";
import {FateItem} from "./FateItem";

/**
 * Корневой класс для всех листов предметов в системе.
 *
 * @template T - класс-описание внутренней структуры данных.
 * @template E - entity-класс, хранимый в БД Foundry.
 */
export abstract class FateItemSheet<Data extends IItem, Entity extends FateItem<Data>>
    extends ItemSheet<Item.Data<Data>, Entity> {

    get template(): string {
        return `${Constants.TEMPLATES_ROOT_PATH}item/${this.item.data.type}Sheet.hbs`;
    }

}