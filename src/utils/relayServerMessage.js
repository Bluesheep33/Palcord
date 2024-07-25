let client;

module.exports.setClient = (c) => {
    client = c;
}

module.exports = async function relayServerMessage(obj) {
    const { channelId } = require('../../config.json');
    const channel = await client.channels.fetch(channelId);
    switch (obj.event) {
        case 'join':
            channel.send(`➕ ${obj.playername} joined the server`);
            break;
        case 'left':
            channel.send(`➖ ${obj.playername} left the server`);
            break;
        case 'chat':
            if (obj.details[0] === 'Global') {
                channel.send(`:rewind: **${obj.playername} (palworld)**: ${obj.details[1]}`);
            }
            break;
    }
}