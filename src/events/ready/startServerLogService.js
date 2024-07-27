const serverLogService = require('../../services/serverLogService');
const {setClient} = require("../../utils/relayServerMessage");

/**
 * Start the server log service
 * @param client The discord client
 * @returns {Promise<void>} A promise
 */
module.exports = async (client) => {
    await setClient(client);
    serverLogService(client);
}