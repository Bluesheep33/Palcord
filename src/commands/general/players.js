const palserverServiceInstance = require("../../services/palserver-service");

module.exports = {
    name: 'players',
    description: 'Get a list of all players that are/were on the Palworld server.',
    options: [],
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