const palserverServiceInstance = require("../../services/palserver-service");

function formatUptime(uptime) {
    const days = Math.floor(uptime / (24*60*60));
    const hours = Math.floor((uptime % (24*60*60)) / (60*60));
    const minutes = Math.floor((uptime % (60*60)) / 60);
    const seconds = Math.floor(uptime % 60);

    return `${days}D:${hours}H:${minutes}M:${seconds}S`;
}

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

            // Format the uptime
            const formattedUptime = formatUptime(uptime);

            // Create the message
            let message =
`Server is online
Server FPS: ${serverfps}
Current Players: ${currentplayernum}
Server Frame Time: ${serverframetime}
Uptime: ${formattedUptime}`;

            // Reply with the message
            await interaction.reply(message);
        } catch (error) {
            console.error(error);
            await interaction.reply("Server is offline");
        }
    }
};