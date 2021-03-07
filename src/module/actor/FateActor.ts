import {FateItem} from "../item/FateItem";
import Constants from "../../constants";
import {CONFIG_HEALTH_SKILL, CONFIG_REFRESH_POINTS, CONFIG_SKILL_POINTS} from "../settings";
import {IActorData, IExtra, IItemData, ISkill, ISlot, IStunt, ITrack} from "../../data/Definitions";

export class FateActor extends Actor<Actor.Data<IActorData>, FateItem<IItemData>> {

    prepareData() {
        super.prepareData();

        const actorData: Actor.Data<IActorData> = this.data;

        //TODO: wrong way here?
        this.data = this._prepareCommonData(actorData);
        console.log("-->Actor Data Here", actorData)
    }

    private _prepareCommonData(actorData: any) {
        const data: IActorData = actorData.data;

        //FatePoints
        data.fate.refresh = game.settings.get(Constants.MODULE_NAME, CONFIG_REFRESH_POINTS);
        let refreshPointsLasts = data.fate.refresh;
        let skillPointsLasts = game.settings.get(Constants.MODULE_NAME, CONFIG_SKILL_POINTS);

        //Stunts
        Object.values(data.stunts).forEach((item: IStunt) => refreshPointsLasts -= item.refreshCost)
        data.info.name = actorData.name;

        //Skills
        data.skills.forEach((item: ISkill) => {
            skillPointsLasts -= item.value;
            item.modifiers = []
        })

        //Tracks
        const healthTrack = game.settings.get(Constants.MODULE_NAME, CONFIG_HEALTH_SKILL);
        let maxHealth = 0;
        let realHealth = 0;
        data.tracks.forEach((item: ITrack) => {
            if (item.skill === healthTrack) {
                item.slots.forEach((slot: ISlot) => {
                    maxHealth += slot.value;
                    if (slot.checked !== true) {
                        realHealth += slot.value;
                    }
                })
            }
        })

        //Extras
        data.extras.forEach((item: IExtra) => {
            data.stunts.push(...item.stunts)

            if (item.usesParentSkills === true) {
                item.skills.forEach((itemSkill: ISkill) => {
                    let targetSkill = data.skills.find((dataSkill: ISkill) => dataSkill.name === itemSkill.name)
                    targetSkill.modifiers.push(itemSkill)
                })
            } else {
                data.skills.push(...item.skills)
            }

            data.tracks.push(...item.tracks)
            data.aspects.push(...item.aspects)
        })

        //Building an advanced info object
        data.advancedInfo = {
            health: {max: maxHealth, real: realHealth},
            refreshPointsLasts: refreshPointsLasts,
            skillPointsLasts: skillPointsLasts
        }

        actorData.data = data;
        return actorData;
    }

}