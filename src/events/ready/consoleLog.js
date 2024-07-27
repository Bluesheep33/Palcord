const { ActivityType } = require('discord.js');

/**
 * Log when the bot is ready
 * @param client The discord client
 */
module.exports = (client) => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    client.user.setActivity({
        name: 'hop on palworld',
        type: ActivityType.Custom
    });
}