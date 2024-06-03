const palserverServiceInstance = require("../../services/palserverService");
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-settings')
        .setDescription('Get the settings of the Palworld server.'),
    adminOnly: false,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Get the server settings
            const settings = await palserverServiceInstance.getSettings();

            // Create the message
            let message = 'Server Settings:';
            for (let key in settings) {
                if (![].includes(key)) {
                    message += `\n${key}: ${settings.key}`;
                }
            }

            // Reply with the message
            await interaction.reply(message);
        } catch (error) {
            console.error(error);
            await interaction.reply("Server is offline");
        }
    }
};