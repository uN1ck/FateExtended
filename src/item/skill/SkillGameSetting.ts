import Constants from "../../constants";

export type GameSkills = {
    skills: [{ name: string }]
}

export class SkillGameSetting extends FormApplication<GameSkills> {

    get template(): string {
        return `${Constants.TEMPLATES_ROOT_PATH}settings/skills/mainForm.hbs`;
    }

    static get defaultOptions(): FormApplication.Options {
        return mergeObject(super.defaultOptions,
            {resizable: true,} as DeepPartial<FormApplication.Options>) as FormApplication.Options;
    }

    get title() {
        return game.i18n.localize("settings.skills.form.title");
    }

    async getData(options?: Application.RenderOptions): Promise<GameSkills> {
        const skills: GameSkills = game.settings.get(Constants.MODULE_NAME, Constants.SKILL_LIST_SETTING);

        return skills;
    }

    protected _updateObject(event: Event, formData: Record<string, unknown> | undefined): Promise<unknown> {

        return game.settings.set(Constants.MODULE_NAME, Constants.SKILL_LIST_SETTING, formData?.skills);
    }

}