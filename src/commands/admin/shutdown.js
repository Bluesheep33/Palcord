const palserverServiceInstance = require("../../services/palserverService");
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Shutdown the server.')
        .addIntegerOption(option =>
            option.setName('waittime')
                .setDescription('The time in seconds to wait before shutting down the server')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to display before shutting down the server')
                .setRequired(false)),
    adminOnly: true,
    deleted: false,
    callback: async (client, interaction) => {
        // Get the waittime and message from the interaction
        const waittime = interaction.options.getInteger('waittime');
        const message = interaction.options.getString('message') || `Server is shutting down in ${waittime} seconds.`;

        try {
            // Shutdown the server
            await palserverServiceInstance.shutdown(waittime, message);

            // Reply to the interaction
            await interaction.reply(`Server is shutting down in ${waittime} seconds.`);
        } catch (error) {
            console.error(error);
            await interaction.reply('Failed to shutdown the server. Server may be offline');
        }
    }
};