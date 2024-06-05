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
            // Split the message into multiple parts
            let messages = message.match(/[\s\S]{1,2000}/g) || [];

            // Reply with each part
            for (let part of messages) {
                await interaction.reply(part);
            }
        } catch (error) {
            console.error(error);
            await interaction.reply("Server is offline");
        }
    }
};