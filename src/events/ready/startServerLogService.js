const serverLogService = require('../../services/serverLogService');
const {setClient} = require("../../utils/relayServerMessage");

module.exports = async (client) => {
    await setClient(client);
    serverLogService(client);
}