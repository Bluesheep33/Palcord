const palworldApiServiceInstance = require("../../services/palworldApiService");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const getImageAttachment = require("../../utils/getImageAttachment");

/**
 * Command to get the settings of the Palworld server
 *
 * @type SlashCommandBuilder the slash command builder
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-settings')
        .setDescription('Get the settings of the Palworld server.'),
    adminOnly: false,
    deleted: false,
    callback: async (client, interaction) => {
        try {
            // Get the server settings
            const settings = await palworldApiServiceInstance.getSettings();
            const settingsChunks = chunkSettings(settings, 18);
            let index = 0;

            // Create embed
            const embed = generateSettingsEmbed(index, settingsChunks);

            // Reply to the interaction
            const message = await interaction.reply({ embeds: [embed], files: [getImageAttachment], fetchReply: true });

            // Add reactions
            await updateArrowOptions(index, message, settingsChunks);

            // Create a reaction collector filter
            const collectorFilter = (reaction, user) => {
                return ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === interaction.user.id;
            };

            // Create a reaction collector
            const collector = message.createReactionCollector({
                filter: collectorFilter, time: 120_000
            });

            // Handle reactions
            collector.on('collect', async (reaction, user) => {
                if (reaction.emoji.name === '➡️' && index < settingsChunks.length - 1) {
                    index++;
                } else if (reaction.emoji.name === '⬅️' && index > 0) {
                    index--;
                }

                const newEmbed = generateSettingsEmbed(index, settingsChunks);
                await message.edit({ embeds: [newEmbed] });

                await updateArrowOptions(index, message, settingsChunks);
            });

            // Handle end of collector
            collector.on('end', async () => {
                const newEmbed = generateSettingsEmbed(index, settingsChunks)
                    .addFields(
                        {
                            "name": "This message is now inactive",
                            "value": "Please use the command again to view more settings",
                            "inline": false
                        }
                    )
                    .setFooter({ "text": "Hop on Palworld!", iconURL: "attachment://palworld.png" });
                await message.edit({ embeds: [newEmbed] });
                await message.reactions.removeAll();
            });
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

/**
 * Chunk the settings into arrays of a specific size
 * @param settings the settings object
 * @param chunkSize the size of each chunk
 * @returns {*[]} the chunked settings
 */
function chunkSettings(settings, chunkSize) {
    // Chunk the settings
    const chunkedArr = [];
    const settingsEntries = Object.entries(settings);
    for (let i = 0; i < settingsEntries.length; i += chunkSize) {
        const chunk = settingsEntries.slice(i, i + chunkSize);
        chunkedArr.push(chunk);
    }

    // Return the chunked settings
    return chunkedArr;
}

/**
 * Generate an embed for the settings
 * @param index the index of the settings chunk
 * @param settingsChunks the chunked settings
 * @returns {EmbedBuilder} the generated embed
 */
function generateSettingsEmbed(index, settingsChunks) {
    // Get the chunk
    const chunk = settingsChunks[index];

    // Create the embed
    const embed = new EmbedBuilder()
        .setTitle("Server Settings")
        .setDescription("Settings of the Palworld server")
        .setColor("Green")
        .setFooter({ text: "Hop on Palworld!", iconURL: "attachment://palworld.png" });

    // Add fields
    let settingsText = "";
    chunk.forEach(([key, value]) => {
        const fieldName = String(key);
        const fieldValue = String(value);

        if (fieldName && fieldValue) {
            settingsText += `**${fieldName}** = ${fieldValue}\n`;
        }
    });
    embed.addFields({ name: " ", value: settingsText, inline: false });

    embed.addFields({ name: `Page ${index + 1}/${settingsChunks.length}`, value: " ", inline: false })

    // Return the embed
    return embed;
}

/**
 * Update the arrow options for the settings embed
 * @param index the index of the settings chunk
 * @param message the message of the bot
 * @param settingsChunks the chunked settings
 * @returns {Promise<void>} a promise
 */
async function updateArrowOptions(index, message, settingsChunks) {
    // Remove previous
    await message.reactions.removeAll();

    // Remove if necessary and else add
    if (index === 0) {
        if (message.reactions.cache.has('⬅️')) {
            await message.reactions.cache.get('⬅️').remove();
        }
    } else {
        await message.react('⬅️');
    }
    if (index === settingsChunks.length - 1) {
        if (message.reactions.cache.has('➡️')) {
            await message.reactions.cache.get('➡️').remove();
        }
    } else {
        await message.react('➡️');
    }
}
