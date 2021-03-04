import Constants from "../constants";

export const CONFIG_REFRESH_POINTS = "refreshPoints";
export const CONFIG_REFRESH_POINTS_CHANGED_EVENT = "refreshPoints_changed";

export const CONFIG_SKILL_POINTS = "skillPoints";
export const CONFIG_SKILL_POINTS_CHANGED_EVENT = "skillPoints_changed";

export const CONFIG_HEALTH_SKILL = "healthSkill";
export const CONFIG_HEALTH_SKILL_CHANGED_EVENT = "healthSkill_changed";

export const registerSettings = function () {
    game.settings.register(Constants.MODULE_NAME, CONFIG_REFRESH_POINTS, {
        name: "Refresh points",
        hint: "Amount of refresh points, available for every Character",
        scope: "world",
        type: Number,
        config: true,
        default: 3,
        onChange: value => {
            console.log("Refresh points changed!", value)
            Hooks.call(CONFIG_REFRESH_POINTS_CHANGED_EVENT, {value: value})
        }
    });

    game.settings.register(Constants.MODULE_NAME, CONFIG_SKILL_POINTS, {
        name: "Skill points",
        hint: "Amount of skill points, available for every Character",
        scope: "world",
        type: Number,
        config: true,
        default: 20,
        onChange: value => {
            console.log("Skill points changed!", value)
            Hooks.call(CONFIG_SKILL_POINTS_CHANGED_EVENT, {value: value})
        }
    });

    game.settings.register(Constants.MODULE_NAME, CONFIG_HEALTH_SKILL, {
        name: "Health skill",
        hint: "Skill^ used for default health indicating",
        scope: "world",
        type: String,
        config: true,
        onChange: value => {
            console.log("Health skill changed!", value)
            Hooks.call(CONFIG_HEALTH_SKILL_CHANGED_EVENT, {value: value})
        }
    });
}
