export const giveFatePointDialog = (actorData) => {

    return new Dialog({
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
                        sound: CONFIG.sounds.dice,
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
}
