import Constants from '../../constants';
import {FateActor} from "./FateActor";


export class FateActorSheet extends ActorSheet<ActorSheet.Data, FateActor> {
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
        const data = this.actor.data.data;

        const fatePointDialog = new Dialog({
            title: "Give Fate point?",
            content: "",
            buttons: {
                yes: {
                    icon: '<i class="fas fa-check"></i>',
                    label: "Yes",
                    callback: async () => {

                        let mess: DeepPartial<ChatMessage.CreateData> = {
                            _id: "", flags: undefined, speaker: undefined, timestamp: 0, whisper: undefined,
                            user: game.user._id,
                            type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
                            content: "Fate Point gaven..."
                        };
                        console.log("MSG", mess)
                        let qq = await ChatMessage.create(mess)
                        console.log("MSG-QQ", qq)
                        ui.chat.postOne(qq).then(value => console.log("VVWW", value));

                        if (data.fate.points > 0) {
                            data.fate.points -= 1;
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
        }, {}).render(true);
    }
}
