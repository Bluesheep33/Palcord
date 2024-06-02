const palserverServiceInstance = require("../../services/palserver-service");
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('players')
        .setDescription('Get a list of all players that are/were on the Palworld server.'),
    devOnly: false,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Get the server status
            const {players}
                = await palserverServiceInstance.getPlayers();

            // Create the message
            let message = `Players: \n${players.join(", ")}`;

            // Reply with the message
            await interaction.reply(message);
        } catch (error) {
            console.error(error);
            await interaction.reply("Server is offline");
        }
    }
};