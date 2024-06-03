const palserverServiceInstance = require("../../services/palserverService");
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a player from the server.')
        .addStringOption(option =>
            option.setName('userid')
                .setDescription('The steam id of the player to ban (can be found with /player [name])')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for banning the player')
                .setRequired(false)),
    adminOnly: true,
    deleted: false,
    callback: async (client, interaction) => {
        // Get the userid and reason from the interaction
        const userid = interaction.options.getString('userid');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        try {
            // Kick the player from the server
            await palserverServiceInstance.ban(userid, reason);

            // Reply to the interaction
            await interaction.reply(`Player with userid ${userid} has been banned from the server.`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`Failed to ban player with userid ${userid} from the server. Server may be offline`);
        }
    }
};