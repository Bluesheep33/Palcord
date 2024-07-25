const relayServerMessage = require('../utils/relayServerMessage');

module.exports = (client, line) => {
    try {
        // Try to parse the line as JSON
        const obj = JSON.parse(line);

        // Log the object
        console.log(obj);

        // Check if the object has an event property
        if (obj.event) {
            let handled = false;
            // Handle the event
            if ([ 'join', 'left', 'chat' ].includes(obj.event)) {
                relayServerMessage(client, obj).then(r => {});
                console.log(`Relaying message for event: ${obj.event}`);
                handled = true;
            }
            if ([ 'join' ].includes(obj.event)) {
                // Add the player to the player repo in db
                console.log(`Adding player to db: ${obj.playername}`);
                handled = true;
            }
            if (!handled) {
                console.log(`Unhandled event: ${obj.event}`);
            }
        } else {
            console.log('No event property found');
        }
    } catch (error) {
        // If an error is thrown, the line is not JSON, so just log the line
        console.log(line);
    }
}
