const { token } = require('../config.json');
const { Client, IntentsBitField } = require('discord.js');
const palServerServiceInstance = require('./palServerService');

// Create a new Discord client
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

// Listener for the ready event
client.on('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    palServerServiceInstance.getInfo().then((data) => {
        console.log(data);
    }).catch((error) => {
        console.error(error);
    });
});

// Login to Discord with the app's token
client.login(token).then(() => {});