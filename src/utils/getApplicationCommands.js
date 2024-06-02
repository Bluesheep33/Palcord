module.exports = async (client) => {
    let applicationCommands
        = await client.application.commands;

    await applicationCommands.fetch();
    return applicationCommands;
};