const { token } = require('../config.json');
const { Client, IntentsBitField, ActivityType } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const stdoutWatcher = require('./services/stdoutService');


// Create a new Discord client
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

// Register event listeners
eventHandler(client);

// Start the stdout watcher
stdoutWatcher();

// Login to Discord with the app's token
client.login(token).then(() => {});