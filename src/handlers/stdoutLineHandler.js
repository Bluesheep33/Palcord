const relayServerMessage = require('../stdoutEvents/relayServerMessage');

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
            if ([ 'join', 'leave', 'chat' ].includes(obj.event)) {
                relayServerMessage(client, obj);
                handled = true;
            }
            if (['join'].includes(obj.event)) {
                // Add the player to the player repo in db
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