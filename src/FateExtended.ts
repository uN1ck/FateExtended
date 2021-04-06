/**
 * This is your TypeScript entry file for Foundry VTT.
 * Register custom settings, sheets, and constants using the Foundry API.
 * Change this heading to be more descriptive to your system, or remove it.
 * Author: [your name]
 * Content License: [copyright and-or license] If using an existing system
 *                    you may want to put a (link to a) license or copyright
 *                    notice here (e.g. the OGL).
 * Software License: [your license] Put your desired license here, which
 *                     determines how others may use and modify your system
 */

// Import TypeScript modules

import Constants from "./constants";
import {registerSettings} from "./module/settings";
import {preloadTemplates} from "./module/preloadTemplates";
import {FateItem} from "./item/FateItem";
import {AspectSheet} from "./item/aspect/AspectSheet";


/* ------------------------------------ */
/* Initialize system					*/
/* ------------------------------------ */
Hooks.once('init', async function () {
    console.log(Constants.MODULE_NAME + ' | Initializing FateExtended');

    // Assign custom classes and constants here


    // Register custom system settings
    registerSettings();

    // Preload Handlebars templates
    await preloadTemplates();

    // Register custom sheets (if any)
    // Define custom Entity classes. This will override the default Actor and
    // Item classes to instead use our extended versions.
    // CONFIG.Actor.entityClass = FateActor;
    CONFIG.Item.entityClass = FateItem;
    //
    // Actors.unregisterSheet("core", ActorSheet);
    // Actors.registerSheet(Constants.MODULE_NAME, FateActorSheet, {makeDefault: true});
    //
    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet(Constants.MODULE_NAME, AspectSheet, {types: ["Aspect"], makeDefault: true});

});

/* ------------------------------------ */
/* Setup system							*/
/* ------------------------------------ */
Hooks.once('setup', function () {
    // Do anything after initialization but before
    // ready
});

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once('ready', function () {
    // Do anything once the system is ready
});

// Add any additional hooks if necessary
