const { token } = require('../config.json');
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');


// Create a new Discord client
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.MessageContent
    ]
});

// Register event listeners
eventHandler(client);

// Login to Discord with the app's token
client.login(token).then(() => {});