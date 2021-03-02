export class FateActorSheet extends ActorSheet {
    static get defaultOptions() {
        let obj = mergeObject(super.defaultOptions, {
            classes: ["boilerplate", "sheet", "actor"],
            template: "systems/boilerplate/templates/actor/actor-sheet.html",
            width: 600,
            height: 600,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description"}]
        });
        return obj;
    }

    getData() {
        const data = super.getData();
        console.log("Data for Sheet", data)
        return data;
    }
}