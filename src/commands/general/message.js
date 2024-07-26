const palworldApiServiceInstance = require("../../services/palworldApiService");
const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

/**
 * Command to send a message to the server chat via Discord
 *
 * @type SlashCommandBuilder the slash command builder
 */
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
            await palworldApiServiceInstance.announce(`${interaction.member.displayName} (discord): ${messageContent}`);

            // Reply to the interaction
            await interaction.reply(`:fast_forward: **${interaction.member.displayName}**: ${messageContent}`);

        } catch (error) {
            console.error(error);
            await interaction.reply(
                { embeds: [
                        new EmbedBuilder()
                            .setTitle("Server is offline or Palcord has experienced an error")
                            .setDescription("Please try again later")
                            .setColor("Red")
                    ]
                }
            );
        }
    }
};