const serverLogService = require('../../services/serverLogService');
const {relayServerMessage} = require("../../utils/relayServerMessage");

module.exports = async (client) => {
    await relayServerMessage.setClient(client);
    serverLogService(client);
}