const palworldApiServiceInstance = require("../../services/palworldApiService");
const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const getImageAttachment = require("../../utils/getImageAttachment");

/**
 * Command to get the status of the Palworld server
 *
 * @type SlashCommandBuilder the slash command builder
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-status')
        .setDescription('Get the status of the Palworld server'),
    adminOnly: false,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Get the server status
            const {serverfps, currentplayernum, serverframetime, uptime}
                = await palworldApiServiceInstance.getMetrics();

            // Format the uptime
            const formattedUptime = formatUptime(uptime);

            // Create embed
            const embed = new EmbedBuilder()
                .setTitle("Server Status")
                .setDescription("Status of the Palworld server.")
                .setColor("Green")
                .addFields(
                    { "name": "Current Players", "value": currentplayernum.toString(), "inline": false },
                    { "name": "Server FPS", "value": serverfps.toString(), "inline": false },
                    { "name": "Server Frame Time", "value": serverframetime.toString(), "inline": false },
                    { "name": "Uptime", "value": formattedUptime, "inline": false }
                )
                .setFooter({ "text": "Hop on Palworld!", iconURL: "attachment://palworld.png"});

            // Reply to the interaction
            await interaction.reply( { embeds: [embed], files: [getImageAttachment]});
        } catch (error) {
            console.error(error);
            await interaction.reply(
                { embeds: [
                        new EmbedBuilder()
                            .setTitle("Server is offline or Palcord has experienced an error")
                            .setDescription("Please try again later")
                            .setColor("Red")
                    ]
                }
            );
        }
    }
}

/**
 * Format the uptime into a human-readable format
 * @param uptime the uptime in seconds
 * @returns {string} the formatted uptime
 */
function formatUptime(uptime) {
    const days = Math.floor(uptime / (24*60*60));
    const hours = Math.floor((uptime % (24*60*60)) / (60*60));
    const minutes = Math.floor((uptime % (60*60)) / 60);
    const seconds = Math.floor(uptime % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
