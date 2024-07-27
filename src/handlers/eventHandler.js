const path = require('path');
const getAllFiles = require('../utils/getAllFiles');

/**
 * Register all event listeners
 * @param client The discord client
 */
module.exports = (client) => {
    // Get the absolute path of the events directory
    const eventsDirectory = path.join(__dirname, '../events');

    // Get all directories in the events directory
    const eventDirs = getAllFiles(eventsDirectory, true);

    // Register each event folder as an event listener
    for (const dir of eventDirs) {
        const eventFiles = getAllFiles(dir);

        const eventName = dir.replace(/\\/g, '/').split('/').pop();

        client.on(eventName, async (arg) => {
            for (const file of eventFiles) {
                const eventFunction = require(file);
                await eventFunction(client, arg);
            }
        });
    }
};