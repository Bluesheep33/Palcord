const palserverServiceInstance = require("../../services/palserver-service");

module.exports = {
    name: 'server-status',
    description: 'Get the status of the Palworld server.',
    options: [],
    devOnly: false,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Get the server status
            const {serverfps, currentplayernum, serverframetime, uptime}
                = await palserverServiceInstance.getMetrics();

            // Create the message
            let message =
`Server is online
Server FPS: ${serverfps}
Current Players: ${currentplayernum}
Server Frame Time: ${serverframetime}
Uptime: ${uptime}`;

            // Reply with the message
            await interaction.reply(message);
        } catch (error) {
            await interaction.reply("Server is offline");
        }
    }
};