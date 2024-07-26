const palworldApiServiceInstance = require("../../services/palworldApiService");
const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

/**
 * Command to force stop the server
 *
 * @type SlashCommandBuilder the slash command builder
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('force-stop')
        .setDescription('Force stop the server.'),
    adminOnly: true,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Force stop the server
            await palworldApiServiceInstance.stop();

            // Create embed
            const embed = new EmbedBuilder()
                .setTitle("Server Force Stopped")
                .setDescription(`Server has been force stopped`)
                .setColor("DarkPurple");

            // Reply to the interaction
            await interaction.reply({ embeds: [embed] });
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