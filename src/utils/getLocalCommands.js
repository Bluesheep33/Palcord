const path = require('path');
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = []) => {
    let localCommands = [];

    const commandCategories = getAllFiles(
        path.join(__dirname, '..', 'commands'),
        true
    );

    for (const commandCategory of commandCategories) {
        const commandFiles = getAllFiles(commandCategory);

        for (const commandFile of commandFiles) {
            const commandObject = require(commandFile);

            if (exceptions.includes(commandObject.name)) {
                continue;
            }

            commandObject.options = commandObject.options || [];

            localCommands.push({
                data: {
                    name: commandObject.name,
                    description: commandObject.description,
                    options: commandObject.options
                }
            });
        }
    }

    return localCommands;
};