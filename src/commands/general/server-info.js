const { publicIp, serverPassword } = require("../../../config.json");
const palserverServiceInstance = require("../../services/palserverService");
const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");

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
            const embed = new EmbedBuilder()
                .setTitle("Server Info")
                .setDescription("Information about the Palworld server.")
                .setColor("DarkAqua")
                .addFields(
                    { name: "Server Name", value: servername, inline: true },
                    { name: "Game Version", value: version, inline: true },
                    { name: "Description", value: description, inline: true },
                    { name: "IP", value: publicIp.toString(), inline: true },
                    { name: "Port", value: port.toString(), inline: true }
                );
            if (serverPassword !== "") {
                embed.addFields({name: "Password", value: serverPassword, inline: true});
            }

            // Reply with the message
            await interaction.reply( { embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply("Server is offline");
        }
    }
};
