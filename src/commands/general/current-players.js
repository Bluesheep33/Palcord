const palserverServiceInstance = require("../../services/palserverService");
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('current-players')
        .setDescription('Get a list of the current players on the Palworld server.'),
    adminOnly: false,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Get the server status
            const {players}
                = await palserverServiceInstance.getPlayers();

            // Create the message
            let message = `Players: ${
                players.map(player => 
                    `Name: ${player.name}, Level: ${player.level}, Ping: ${player.ping}, Steam: ${player.userId}`)
                    .join("\n")
            }`;

            // Reply with the message
            await interaction.reply(message);
        } catch (error) {
            console.error(error);
            await interaction.reply("Server is offline");
        }
    }
};