const { publicIp, password } = require("../../../config.json");
const palserverServiceInstance = require("../../services/palserver-service");

module.exports = {
    name: 'server-info',
    description: 'Get information about the Palworld server.',
    options: [],
    devOnly: false,
    deleted: false,
    callback: async (client, interaction) => {
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
    }
};
