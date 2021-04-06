import {IItem} from "../data/IItem";

/**
 * Класс описание любого предмета
 * @template T - класс-описание внутренней структуры данных.
 */
export class FateItem<Data extends IItem> extends Item<Item.Data<Data>> {

    prepareData() {
        super.prepareData();
    }

}