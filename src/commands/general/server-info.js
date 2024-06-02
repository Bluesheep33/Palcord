const {SlashCommandBuilder} = require("discord.js");
const { password } = require("../../../config.json");
const palserverServiceInstance = require("../../services/palserver-service");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("server-info")
        .setDescription("Get information about the palworld server"),

    async execute(interaction) {
        // Get the server information
        const { version, servername, description }
            = await palserverServiceInstance.getInfo();
        const { PublicIP: ip, PublicPort: port }
            = await palserverServiceInstance.getSettings();

        // Create the message
        let message =
            `Server Name: ${servername}\n
            Game Version: ${version}\n
            Description: ${description}\n
            IP: ${ip}\n
            Port: ${port}`;
        if (password !== "") {
            message += `\nPassword: ${password}`;
        }

        // Reply with the message
        await interaction.reply(message);
    }
};
