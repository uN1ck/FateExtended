import {IAspect} from "../../../data/IAspect";

export const LOCALIZATION_ROOT = "Aspect.Edit.";
export const DIALOG_TEMPLATE = "systems/FateExtended/templates/aspects/AspectEdit.html"

/**
 * Interface for Handlebars Render
 */
interface IAspectRender<D extends IAspect> {
    labelText: string;
    nameText: string
    descriptionText: string;
    aspect: D
}

/**
 * Method creates new instance of Dialog, used for creating or changing aspect
 * @param onChange handler for aspect change
 * @param aspect aspect object if exists
 * @return promise with new dialog instance
 */
export const createAspectDialog = async (onChange: (newAspect: IAspect) => any, aspect?: IAspect): Promise<Dialog> => {
    return new Dialog({
        title: game.i18n.localize(`${LOCALIZATION_ROOT}EditAspectFormTitle`),
        content: await renderTemplate(DIALOG_TEMPLATE,
            {
                aspect: aspect,
                descriptionText: game.i18n.localize(`${LOCALIZATION_ROOT}Description`),
                labelText: game.i18n.localize(`${LOCALIZATION_ROOT}Label`),
                nameText: game.i18n.localize(`${LOCALIZATION_ROOT}Name`)
            }),
        buttons: {
            yes: {
                icon: '<i class="fas fa-check"></i>',
                label: game.i18n.localize("Dialog.Ok"),
                callback: async (html: JQuery) => {
                    console.log("YES")
                    const changedAspect: IAspect = {
                        label: html.find("input#aspect.label").val()?.toString(),
                        name: html.find("input#aspect.name").val()?.toString(),
                        description: html.find("textarea#aspect.description").val()?.toString(),
                    };
                    onChange(changedAspect);
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