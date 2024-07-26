const palworldApiServiceInstance = require("../../services/palworldApiService");
const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

/**
 * Command to kick a player from the server
 *
 * @type SlashCommandBuilder the slash command builder
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a player from the server.')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('The steam id of the player to kick (can be found with /player [name])')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for kicking the player')
                .setRequired(false)),
    adminOnly: true,
    deleted: false,
    callback: async (client, interaction) => {
        // Get the userid and reason from the interaction
        const userid = interaction.options.getString('userid');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        try {
            // Kick the player from the server
            await palworldApiServiceInstance.kick(userid, reason);

            // Create embed
            const embed = new EmbedBuilder()
                .setTitle("Player Kicked")
                .setDescription(`Player with userid ${userid} has been kicked from the server`)
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