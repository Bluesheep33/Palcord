const palworldApiServiceInstance = require("../../services/palworldApiService");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const getImageAttachment = require("../../utils/getImageAttachment");

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

            const embed = generateSettingsEmbed(index, settingsChunks);
            const message = await interaction.reply({ embeds: [embed], files: [getImageAttachment], fetchReply: true });

            await updateArrowOptions(index, message, settingsChunks);

            const collectorFilter = (reaction, user) => {
                return ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === interaction.user.id;
            };

            const collector = message.createReactionCollector({
                filter: collectorFilter, time: 120_000
            });

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

function chunkSettings(settings, chunkSize) {
    const chunkedArr = [];
    const settingsEntries = Object.entries(settings);
    for (let i = 0; i < settingsEntries.length; i += chunkSize) {
        const chunk = settingsEntries.slice(i, i + chunkSize);
        chunkedArr.push(chunk);
    }
    return chunkedArr;
}

function generateSettingsEmbed(index, settingsChunks) {
    const chunk = settingsChunks[index];
    const embed = new EmbedBuilder()
        .setTitle("Server Settings")
        .setDescription("Settings of the Palworld server")
        .setColor("Green")
        .setFooter({ text: "Hop on Palworld!", iconURL: "attachment://palworld.png" });

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

    return embed;
}

async function updateArrowOptions(index, message, settingsChunks) {
    // Remove previous
    await message.reactions.removeAll();

    // Remove if necessary
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
