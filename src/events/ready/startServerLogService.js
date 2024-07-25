const serverLogService = require('../../services/serverLogService');
const {relayServerMessage} = require("../../utils/relayServerMessage");

module.exports = (client) => {
    serverLogService(client);
    relayServerMessage.setClient(client);
}