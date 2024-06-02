const palserverServiceInstance = require("../../services/palserver-service");

module.exports = {
    name: 'kick',
    description: 'Kick a player from the server.',
    options: [
        {
            name: 'userid',
            type: 'STRING',
            description: 'The steam id of the player to kick (can be found with /player [name])',
            required: true
        },
        {
            name: 'reason',
            type: 'STRING',
            description: 'The reason for kicking the player',
            required: false
        }
    ],
    devOnly: true,
    deleted: false,
    callback: async (client, interaction) => {
        // Get the userid and reason from the interaction
        const userid = interaction.options.getString('userid');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        try {
            // Kick the player from the server
            await palserverServiceInstance.kick(userid, reason);

            // Reply to the interaction
            await interaction.reply(`Player with userid ${userid} has been kicked from the server.`);
        } catch (error) {
            console.error(error);
            await interaction.reply(`Failed to kick player with userid ${userid} from the server. Server may be offline`);
        }
    }
};