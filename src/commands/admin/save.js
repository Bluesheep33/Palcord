const palworldApiServiceInstance = require("../../services/palworldApiService");
const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

/**
 * Command to save the server
 *
 * @type SlashCommandBuilder the slash command builder
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('save')
        .setDescription('Save the server.'),
    adminOnly: true,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Save the server
            await palworldApiServiceInstance.save();

            // Create embed
            const embed = new EmbedBuilder()
                .setTitle("Server Saved")
                .setDescription(`Server has been saved`)
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