const { channelId } = require('../../config.json');

module.exports = (client, obj) => {
    const channel = client.channels.cache.get(channelId);
    switch (obj.event) {
        case 'join':
            channel.send(`${obj.playername} joined the server`);
            break;
        case 'leave':
            channel.send(`${obj.playername} left the server`);
            break;
        case 'chat':
            if (obj.details[0] === 'global') {
                channel.send(`${obj.playername}: ${obj.details[1]}`);
            }
            break;
    }
}