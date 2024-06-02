const path = require('path');
const getAllFiles = require('../utils/getAllFiles');

module.exports = (client) => {
    // Get the absolute path of the events directory
    const eventsDirectory = path.join(__dirname, '../events');

    // Get all JavaScript files in the events directory
    const eventFiles = getAllFiles(eventsDirectory).filter(file => file.endsWith('.js'));

    // Register each event file as an event listener
    for (const file of eventFiles) {
        // Require the event file
        const event = require(file);

        // Get the event name from the file name
        const eventName = path.basename(file, '.js');

        // Register the event listener
        client.on(eventName, event.bind(null, client));
    }
};