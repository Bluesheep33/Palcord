const palworldApiServiceInstance = require("../../services/palworldApiService");
const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const getImageAttachment = require("../../utils/getImageAttachment");

/**
 * Command to get a list of the current players on the Palworld server
 *
 * @type SlashCommandBuilder the slash command builder
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('current-players')
        .setDescription('Get a list of the current players on the Palworld server.'),
    adminOnly: false,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Get the server status
            const {players} = await palworldApiServiceInstance.getPlayers();

            // Create embed
            const embed = new EmbedBuilder()
                .setTitle("Current Players")
                .setDescription("List of current players on the Palworld server")
                .setColor("Green")
                .setFooter({ text: "Hop on Palworld!", iconURL: "attachment://palworld.png" });

            // Add fields to the embed
            if (players.length > 0) {
                for (const player of players) {
                    embed.addFields(
                        {
                            name: player.name,
                            value: `level: ${player.level}\nping: ${player.ping}\nsteam: ${player.userId}`,
                            inline: true
                        }
                    );
                }
            } else {
                embed.addFields(
                    {
                        name: "There are currently no players on the server",
                        value: " ",
                        inline: false
                    }
                );
            }

            // Reply to the interaction
            await interaction.reply({ embeds: [embed], files: [getImageAttachment] });
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
};