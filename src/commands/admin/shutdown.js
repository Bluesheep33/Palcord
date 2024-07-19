const palworldApiServiceInstance = require("../../services/palworldApiService");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shutdown')
        .setDescription('Shutdown the server.')
        .addIntegerOption(option =>
            option.setName('wait_time')
                .setDescription('The time in seconds to wait before shutting down the server')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to display before shutting down the server')
                .setRequired(false)),
    adminOnly: true,
    deleted: false,
    callback: async (client, interaction) => {
        // Get the wait time and message from the interaction
        const waitTime = interaction.options.getInteger('wait_time');
        const message = interaction.options.getString('message') || `Server is shutting down in ${waitTime} seconds.`;

        try {
            // Shutdown the server
            await palworldApiServiceInstance.shutdown(waitTime, message);

            // Reply to the interaction
            const embed = new EmbedBuilder()
                .setTitle("Server Shutdown")
                .setDescription(`Server is shutting down in ${waitTime} seconds.`)
                .setColor("DarkPurple");

            await interaction.reply({ embeds: [embed] });
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