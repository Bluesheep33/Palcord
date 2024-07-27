const { adminId } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

/**
 * Handle commands
 * @param client The discord client
 * @param interaction The interaction object
 * @returns {Promise<void>} A promise
 */
module.exports = async (client, interaction) => {
    // If the interaction is not a command, return
    if (!interaction.isChatInputCommand()) return;

    // Get the local commands
    const localCommands = getLocalCommands();

    // Try to run the command
    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.data.name === interaction.commandName
        );

        if (!commandObject) return;

        if (commandObject.adminOnly) {
            if (!interaction.member.id === adminId) {
                interaction.reply({
                    content: 'Only the admin is allowed to run this command.',
                    ephemeral: true,
                });
                return;
            }
        }

        commandObject.callback(client, interaction);
    } catch (error) {
        console.error(`There was an error running this command: ${error}`);
    }
};