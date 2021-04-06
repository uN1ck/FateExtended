import "../../system/templates/**/*.hbs"

export const preloadTemplates = async function () {
    // @ts-ignore
    const templatePaths = [__ALL_TEMPLATES__];

    return loadTemplates(templatePaths);
}
