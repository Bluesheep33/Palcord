

module.exports = (obj) => {
    switch (obj.event) {
        case 'join':
            console.log(`${obj.playername} joined the server`);
            break;
        case 'leave':
            console.log(`${obj.playername} left the server`);
            break;
        case 'chat':
            if (obj.details[0] === 'global') {
                console.log(`${obj.playername}: ${obj.details[1]}`);
            }
            break;
    }
}