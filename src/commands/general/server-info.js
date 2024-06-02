const { publicIp, password } = require("../../../config.json");
const palserverServiceInstance = require("../../services/palserver-service");
const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('Get information about the Palworld server.'),
    adminOnly: false,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Get the server information
            const {version, servername, description}
                = await palserverServiceInstance.getInfo();
            const {PublicPort: port}
                = await palserverServiceInstance.getSettings();

            // Create the message
            let message =
`Server Name: ${servername}
Game Version: ${version}
Description: ${description}
IP: ${publicIp}
Port: ${port}`;

            if (password !== "") {
                message += `\nPassword: ${password}`;
            }

            // Reply with the message
            await interaction.reply(message);
        } catch (error) {
            console.error(error);
            await interaction.reply("Server is offline");
        }
    }
};
