import {FateItemSheet} from "../FateItemSheet";
import {IAspect} from "../../data/IAspect";
import {Aspect} from "./Aspect";

export class AspectSheet extends FateItemSheet<IAspect, Aspect> {

    static get defaultOptions(): BaseEntitySheet.Options {
        return mergeObject(super.defaultOptions,
            {
                height: 310,
                width: 300,
                resizable: true,
            } as DeepPartial<BaseEntitySheet.Options>) as BaseEntitySheet.Options;
    }

    get title() {
        return this.item.data.data.name;
    }

    async getData(options?: any): Promise<Item.Data<IAspect>> {
        const superData = await super.getData(options);

        const mergedData = {
            ...superData,
        };

        return mergedData;
    }

    activateListeners(html: JQuery) {
        super.activateListeners(html);
        html.find("#roll-aspect-to-chat")
            .on("click", this.rollToChat);
    }

    public rollToChat = async () => {
        const actor = this.actor;
        const userId = game.user?._id;

        await ChatMessage.create({
            user: userId,
            speaker: ChatMessage.getSpeaker({actor: actor}),
            type: CONST.CHAT_MESSAGE_TYPES.OTHER,
            sound: CONFIG.sounds.notification,
            content: await renderTemplate(this.messageTemplate, this.item.data),
        })
    }

}
