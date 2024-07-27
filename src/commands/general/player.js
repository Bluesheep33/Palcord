const palworldApiServiceInstance = require("../../services/palworldApiService");
const {SlashCommandBuilder, EmbedBuilder} = require("discord.js");
const getImageAttachment = require("../../utils/getImageAttachment");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('player')
        .setDescription('Get information about a specific player on the Palworld server.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the player')
                .setRequired(true)),
    adminOnly: false,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Get the player's name from the interaction
            const playerName = interaction.options.getString('name');

            // Get the player's information from the service
            const players = await palworldApiServiceInstance.getPlayers();

            // Find the player with the given name
            const player = players.players.find(p => p.name === playerName);

            // If the player does not exist, reply with an error message
            if (!player) {
                const embed = new EmbedBuilder()
                    .setTitle("Player Not Found")
                    .setDescription(`Player _${playerName}_ does not exist on the server.`)
                    .setColor("Yellow");
                await interaction.reply({ embeds: [embed] });
                return;
            }

            const embed = new EmbedBuilder()
                .setTitle(`Info about _${player.name}_`)
                .setDescription("Information about the Palworld player")
                .setColor("Green")
                .addFields(
                    { "name": "Player Id", "value": player.playerId.toString(), "inline": true },
                    { "name": "Steam Id", "value": player.userId.toString(), "inline": true },
                    { "name": "IP", "value": player.ip.toString(), "inline": true },
                    { "name": "Ping", "value": player.ping.toString(), "inline": true },
                    { "name": "Position", "value": `X:${player.location_x} Y:${player.location_y}`, "inline": true },
                    { "name": "Level", "value": player.level.toString(), "inline": true }
                )
                .setFooter({ "text": "Hop on Palworld!", iconURL: "attachment://palworld.png"});

            await interaction.reply({ embeds: [embed], files: [getImageAttachment] });
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