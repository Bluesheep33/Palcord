const { token } = require('../config.json');
const { Client, IntentsBitField } = require('discord.js');
const palServerServiceInstance = require('./palServerService');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    palServerServiceInstance.getServerStatus().then((data) => {
        console.log(data);
    }).catch((error) => {
        console.error(error);
    });
});

client.login(token).then(() => {});