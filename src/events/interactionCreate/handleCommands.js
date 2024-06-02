const { adminId } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands();

    try {
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if (!commandObject) return;

        if (commandObject.devOnly) {
            if (!interaction.member.id.equals(adminId)) {
                interaction.reply({
                    content: 'Only the admin is allowed to run this command.',
                    ephemeral: true,
                });
                return;
            }
        }

        commandObject.callback(client, interaction);
    } catch (error) {
        console.log(`There was an error running this command: ${error}`);
    }
};