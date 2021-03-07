import Constants from '../../constants';
import {IActorData, IItemData} from "../../data/Definitions";
import {FateActor} from "./FateActor";
import {FateItem} from "../item/FateItem";


export class FateActorSheet<I extends FateItem<IItemData>,
    A extends FateActor<Actor.Data<IActorData>, I>> extends ActorSheet<A, A> {
    static get defaultOptions() {
        // @ts-ignore
        return mergeObject(super.defaultOptions, {
            classes: ["sheet", "actor"],
            template: "systems/" + Constants.MODULE_NAME + "/templates/actor-sheet.html",
            width: 600,
            height: 600,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
    }

    getData() {
        const data = super.getData();

        return data;
    }

    activateListeners(html: JQuery) {
        super.activateListeners(html);
        if (!this.options.editable) return;


        html.find('button#give-fate-point').on("click", this.handleGiveFatePoint.bind(this))
    }

    handleGiveFatePoint(eventArg) {
        console.log("EVARG", eventArg)
        const data = super.getData();
        //this.actor.data.data

        const fatePointDialog = new Dialog({
            title: "Give Fate point?",
            content: "",
            buttons: {
                yes: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Yes",
                    callback: () => {

                        let mess = new ChatMessage({
                            user: game.user._id,
                            type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
                            sound: CONFIG.sounds.notification,
                            message: {
                                flavour: "You gave Fate Point to <<NAME_PLACEHOLDER>>",
                                content: "Fate Point gaven..."
                            }
                        }, {});
                        chatLog.postOne(mess, true);

                        if (actorData.fate.points > 0) {
                            actorData.fate.points -= 1;
                        } else {

                        }
                    }
                },
                no: {
                    label: "No",
                    callback: () => {
                    }
                }
            },
            default: "no",
            close: (html) => {
                console.log("This always is logged no matter which option is chosen")
            }
        }, {});
        fatePointDialog.render();
    }
}
