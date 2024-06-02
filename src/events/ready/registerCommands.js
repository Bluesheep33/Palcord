const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');

module.exports = async (client) => {
    try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(client);

        for (const command of localCommands) {
            const { name, description, options } = command;

            if (!name) {
                console.error('⏩Skipping command without a name');
                continue;
            }

            const existingCommand = await applicationCommands.cache.find(
                (command) => command.name === name);

            if (existingCommand) {
                if (command.deleted) {
                    await applicationCommands.delete(
                        existingCommand.id
                    );
                    console.log(`🗑️Deleted command: ${name}`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, command)) {
                    await applicationCommands.edit(
                        existingCommand.id,
                        {name, description, options}
                    );
                    console.log(`🔄Edited command: ${name}`);
                }
            } else {
                if (command.deleted) {
                    console.log(`⏩Skipping deleted command: ${name}`)
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options
                });
                console.log(`➕Registered command: ${name}`);
            }
        }
    } catch (error) {
        console.error(error);
    }
};
