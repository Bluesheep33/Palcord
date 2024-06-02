const { ActivityType } = require('discord.js');

module.exports = (client) => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    client.user.setActivity({
        name: 'hop on palworld',
        type: ActivityType.Custom
    });
}