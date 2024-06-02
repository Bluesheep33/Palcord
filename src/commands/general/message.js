const palserverServiceInstance = require("../../services/palserver-service");
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('Send a message to the server chat via Discord.')
        .addStringOption(option =>
            option.setName('content')
                .setDescription('The content of the message')
                .setRequired(true)),
    adminOnly: false,
    deleted: false,
    callback: async (client, interaction) => {
        // Get the message content from the interaction
        const messageContent = interaction.options.getString('content');

        try {
            // Send the message to the server chat
            await palserverServiceInstance.announce(messageContent);

            // Reply to the interaction
            await interaction.reply(`Message sent to the server chat: ${messageContent}`);
        } catch (error) {
            console.error(error);
            await interaction.reply("Failed to send the message to the server chat. Server may be offline.");
        }
    }
};