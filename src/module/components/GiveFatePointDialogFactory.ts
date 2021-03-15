export const createGiveFatePointDialog = async (fateActor: Actor, callback: () => any): Promise<Dialog> => {
    return new Dialog({
        title: game.i18n.localize("Actor.Sheet.GiveFatePointDialog.header"),
        content: await renderTemplate(DIALOG_TEMPLATE,
            {header: game.i18n.localize("Actor.Sheet.GiveFatePointDialog.content")}),
        buttons: {
            yes: {
                icon: '<i class="fas fa-check"></i>',
                label: game.i18n.localize("Dialog.Ok"),
                callback: async (html: JQuery) => {
                    if (fateActor.data.data.fate.points > 0) {
                        fateActor.data.data.fate.points -= 1;

                        let message: DeepPartial<ChatMessage.CreateData> = await newFatePointMessage(html);
                        message.speaker = ChatMessage.getSpeaker({actor: fateActor});
                        await ChatMessage.create(message);

                        callback();

                    } else {
                        //TODO: Make player know about failure?
                    }
                }
            },
            no: {
                icon: '<i class="fas fa-times"></i>',
                label: game.i18n.localize("Dialog.Cancel"),
                callback: () => {
                    //TODO: Make player know about canceling?
                }
            }
        },
        default: "no",
    });
}

const DIALOG_TEMPLATE = "systems/FateExtended/templates/chat/GiveFatePointDialog.html";
const MESSAGE_TEMPLATE = "systems/FateExtended/templates/chat/Message.html";

const newFatePointMessage = async (html: JQuery): Promise<DeepPartial<ChatMessage.CreateData>> => {
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
        content: await renderTemplate(MESSAGE_TEMPLATE, templateData),
    }
}

