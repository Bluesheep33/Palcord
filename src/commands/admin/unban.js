const palserverServiceInstance = require("../../services/palserverService");
const {SlashCommandBuilder} = require("discord.js");

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
            await palserverServiceInstance.unban(userid);

            // Reply to the interaction
            await interaction.reply(`Player with userid ${userid} has been unbanned from the server.`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`Failed to unban player with userid ${userid} from the server. Server may be offline`);
        }
    }
};