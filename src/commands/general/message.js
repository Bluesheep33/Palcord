const palserverServiceInstance = require("../../services/palserver-service");

module.exports = {
    name: 'message',
    description: 'Send a message to the server chat via Discord.',
    options: [
        {
            name: 'content',
            type: 'STRING',
            description: 'The content of the message',
            required: true,
        },
    ],
    devOnly: false,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Get the message content from the interaction
            const messageContent = interaction.options.getString('content');

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