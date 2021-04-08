import "../../system/templates/**/*.hbs"

export const preloadTemplates = async function () {
    // @ts-ignore
    const templatePaths = [__ALL_TEMPLATES__];
    console.log("APPTEMPLATES", templatePaths)
    return loadTemplates(templatePaths);
}
