import {FateActor} from "../actor/FateActor";

export class GiveFatePointDialog extends Dialog {

    static async newDialog(actorData: FateActor): Promise<Dialog> {
        return new Dialog({
            title: game.i18n.localize("Actor.Sheet.GiveFatePointDialog.header"),
            content: await renderTemplate("systems/FateExtended/templates/chat/Message.html",
                {header: game.i18n.localize("Actor.Sheet.GiveFatePointDialog.content")}),
            buttons: {
                yes: {
                    icon: '<i class="fas fa-check"></i>',
                    label: game.i18n.localize("Dialog.Ok"),
                    callback: async (html: JQuery) => {
                        if (actorData.data.data.fate.points > 0) {
                            actorData.data.data.fate.points -= 1;

                            const template = "systems/FateExtended/templates/chat/Message.html";
                            let templateData = {
                                header: game.i18n.localize("Actor.Sheet.GiveFatePointMessage.header"),
                                templatedText: game.i18n.localize("Actor.Sheet.GiveFatePointMessage.content"),
                                causeText: html.find("input#fate-point-give-dialog").val(),
                                invokedBy: game.i18n.localize("Actor.Sheet.GiveFatePointMessage.invokedBy") + ": " + game.user.name
                            };

                            // @ts-ignore
                            await ChatMessage.create({
                                speaker: ChatMessage.getSpeaker({actor: actorData}),
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
                    callback: () => {
                    }
                }
            },
            default: "no",
        });
    }

}