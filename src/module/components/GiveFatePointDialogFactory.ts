import {FateActor} from "../actor/FateActor";
import {IActorData} from "../../data/Definitions";
import {FateActorSheet} from "../actor/FateActorSheet";

export class GiveFatePointDialogFactory {

    dialogTemplate = "systems/FateExtended/templates/chat/GiveFatePointDialog.html";
    messageTemplate = "systems/FateExtended/templates/chat/Message.html";

    async newDialog(fateActorSheet: FateActorSheet): Promise<Dialog> {
        return new Dialog({
            title: game.i18n.localize("Actor.Sheet.GiveFatePointDialog.header"),
            content: await renderTemplate(this.dialogTemplate,
                {header: game.i18n.localize("Actor.Sheet.GiveFatePointDialog.content")}),
            buttons: {
                yes: {
                    icon: '<i class="fas fa-check"></i>',
                    label: game.i18n.localize("Dialog.Ok"),
                    callback: async (html: JQuery) => {
                        if (fateActorSheet.actor.data.data.fate.points > 0) {
                            fateActorSheet.actor.data.data.fate.points -= 1;

                            let message: DeepPartial<ChatMessage.CreateData> = await this.newFatePointMessage(html);
                            message.speaker = ChatMessage.getSpeaker({actor: fateActorSheet.actor});
                            await ChatMessage.create(message);
                            fateActorSheet.render(true);

                        } else {
                            //TODO: Make player know about failure?
                        }
                    }
                },
                no: {
                    icon: '<i class="far fa-window-close"></i>',
                    label: game.i18n.localize("Dialog.Cancel"),
                    callback: () => {
                        //TODO: Make player know about canceling?
                    }
                }
            },
            default: "no",
        });
    }

    private async newFatePointMessage(html: JQuery): Promise<DeepPartial<ChatMessage.CreateData>> {
        let templateData = {
            header: game.i18n.localize("Actor.Sheet.GiveFatePointMessage.header"),
            templatedText: game.i18n.localize("Actor.Sheet.GiveFatePointMessage.content"),
            causeText: html.find("input#fate-point-give-dialog").val(),
            invokedBy: game.i18n.localize("Actor.Sheet.GiveFatePointMessage.invokedBy") + ": " + game.user.name
        };

        // @ts-ignore
        return {
            timestamp: Date.now(),
            whisper: undefined,
            user: game.user._id,
            type: CONST.CHAT_MESSAGE_TYPES.EMOTE,
            content: await renderTemplate(this.messageTemplate, templateData),
        }
    }

}