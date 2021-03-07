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

    async handleGiveFatePoint(eventArg) {

        const data = this.actor.data.data;
        const actor = this.actor;

        new Dialog({
            title: game.i18n.localize("Actor.Sheet.GiveFatePointDialog.header"),
            content: "<p>" +
                game.i18n.localize("Actor.Sheet.GiveFatePointDialog.content") +
                "</p>" +
                "<input type=\"text\" id=\"fate-point-give-dialog\">",
            buttons: {
                yes: {
                    icon: '<i class="fas fa-check"></i>',
                    label: game.i18n.localize("Dialog.Ok"),
                    callback: async (html: JQuery) => {
                        if (data.fate.points > 0) {
                            data.fate.points -= 1;

                            const template = "systems/FateExtended/templates/chat/Message.html";
                            let templateData = {
                                header: game.i18n.localize("Actor.Sheet.GiveFatePointMessage.header"),
                                templatedText: game.i18n.localize("Actor.Sheet.GiveFatePointMessage.content"),
                                causeText: html.find("input#fate-point-give-dialog").val(),
                                invokedBy: game.user.name
                            };

                            // @ts-ignore
                            await ChatMessage.create({
                                speaker: ChatMessage.getSpeaker({actor: actor}),
                                timestamp: Date.now(),
                                whisper: undefined,
                                user: game.user._id,
                                type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
                                content: await renderTemplate(template, templateData),
                            })
                        } else {
                            //TODO: Make player know about failure
                        }
                    }
                },
                no: {
                    icon: '<i class="far fa-window-close"></i>',
                    label: game.i18n.localize("Dialog.Cancel"),
                    callback: (html: JQuery) => {
                    }
                }
            },
            default: "no",
        }).render(true);
    }
}
