const palworldApiServiceInstance = require("../../services/palworldApiService");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

/**
 * Command to unban a player from the server
 *
 * @type SlashCommandBuilder the slash command builder
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban a player from the server.')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('The steam id of the player to unban')
                .setRequired(true)),
    adminOnly: true,
    deleted: false,
    callback: async (client, interaction) => {
        // Get the userid and reason from the interaction
        const userid = interaction.options.getString('userid');

        try {
            // Unban the player from the server
            await palworldApiServiceInstance.unban(userid);

            // Create embed
            const embed = new EmbedBuilder()
                .setTitle("Player Unbanned")
                .setDescription(`Player with userid ${userid} has been unbanned from the server`)
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