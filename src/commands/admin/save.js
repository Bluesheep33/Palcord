const palserverServiceInstance = require("../../services/palserverService");
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('save')
        .setDescription('Save the server.'),
    adminOnly: true,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Save the server
            await palserverServiceInstance.save();

            // Reply to the interaction
            await interaction.reply('Server has been saved.');
        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to save the server. Server may be offline');
        }
    }
};