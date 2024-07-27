const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');

/**
 * Register commands
 * @param client The discord client
 * @returns {Promise<void>} A promise
 */
module.exports = async (client) => {
    try {
        // Get the local and application commands
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client);

        // Register local commands if needed
        for (const command of localCommands) {
            const { data: { name, description, options } } = command;

            // Skip commands without a name
            if (!name) {
                console.error('⏩ Skipping command without a name');
                continue;
            }

            // Find the related application command
            const existingCommand = await applicationCommands.cache.find(
                (command) => command.name === name);

            // Check if the command is different
            if (existingCommand) {
                // If the command is marked deleted, delete it
                if (command.deleted) {
                    await applicationCommands.delete(
                        existingCommand.id
                    );
                    console.log(`🗑️ Deleted command: ${name}`);
                    continue;
                }

                // If the commands are different, edit it
                if (areCommandsDifferent(existingCommand, command)) {
                    await applicationCommands.edit(
                        existingCommand.id,
                        {name, description, options}
                    );
                    console.log(`🔄 Edited command: ${name}`);
                }
            } else {
                // If the command is marked deleted, skip it
                if (command.deleted) {
                    console.log(`⏩ Skipping deleted command: ${name}`)
                    continue;
                }

                // Register the command
                await applicationCommands.create({
                    name,
                    description,
                    options
                });
                console.log(`➕ Registered command: ${name}`);
            }
        }
    } catch (error) {
        console.error(error);
    }
};
