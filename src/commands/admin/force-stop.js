const palserverServiceInstance = require("../../services/palserverService");
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('force-stop')
        .setDescription('Force stop the server.'),
    adminOnly: true,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Force stop the server
            await palserverServiceInstance.stop();

            // Reply to the interaction
            await interaction.reply('Server has been force stopped.');
        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to force stop the server. Server may be offline');
        }
    }
};