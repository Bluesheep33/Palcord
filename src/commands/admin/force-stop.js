const palserverServiceInstance = require("../../services/palserverService");
const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

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
            const embed = new EmbedBuilder()
                .setTitle("Server Force Stopped")
                .setDescription(`Server has been force stopped`)
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