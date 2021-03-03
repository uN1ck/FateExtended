import Constants from "../constants";

export const CONFIG_REFRESH_POINTS = "refreshPoints";
export const CONFIG_SKILL_POINTS = "skillPoints";

export const registerSettings = function () {
    game.settings.register(Constants.MODULE_NAME, CONFIG_REFRESH_POINTS, {
        name: "Refresh points",
        hint: "Amount of refresh points, available for every Character",
        scope: "world",
        type: Number,
        default: 3,
        onChange: value => {
            console.log("Refresh points changed!", value)
        }
    });

    game.settings.register(Constants.MODULE_NAME, CONFIG_SKILL_POINTS, {
        name: "Skill points",
        hint: "Amount of skill points, available for every Character",
        scope: "world",
        type: Number,
        default: 20,
        onChange: value => {
            console.log("Skill points changed!", value)
        }
    });
}
