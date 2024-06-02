const palserverServiceInstance = require("../../services/palserver-service");

module.exports = {
    name: 'player',
    description: 'Get information about a specific player on the Palworld server.',
    options: [
        {
            name: 'name',
            type: 'STRING',
            description: 'The name of the player',
            required: true,
        },
    ],
    devOnly: false,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Get the player's name from the interaction
            const playerName = interaction.options.getString('name');

            // Get the player's information from the service
            const players = await palserverServiceInstance.getPlayers();

            // Find the player with the given name
            const player = players.find(p => p.name === playerName);

            // If the player does not exist, reply with an error message
            if (!player) {
                await interaction.reply(`Player ${playerName} does not exist on the server.`);
                return;
            }

            // Create the message
            let message =
`Player: ${player.name}
Id: ${player.playerId}
Steam Id: ${player.userId}
Ip: ${player.ip}
Ping: ${player.ping}
Position: X:${player.location_x} Y:${player.location_y}
Level: ${player.level}`;

            // Reply with the message
            await interaction.reply(message);
        } catch (error) {
            console.error(error);
            await interaction.reply("Server is offline");
        }
    }
};