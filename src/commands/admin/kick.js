const palserverServiceInstance = require("../../services/palserver-service");
const {SlashCommandBuilder} = require("discord.js");

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
    devOnly: true,
    deleted: false,
    callback: async (client, interaction) => {
        // Get the userid and reason from the interaction
        const userid = interaction.options.getString('userid');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        try {
            // Kick the player from the server
            await palserverServiceInstance.kick(userid, reason);

            // Reply to the interaction
            await interaction.reply(`Player with userid ${userid} has been kicked from the server.`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`Failed to kick player with userid ${userid} from the server. Server may be offline`);
        }
    }
};