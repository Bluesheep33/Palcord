const { ip, port, username, password } = require('../config.json');
const axios = require('axios');

class palServerService {
    constructor() {
        this.api = axios.create({
            baseURL: `http://${ip}:${port}`,
            maxBodyLength: Infinity,
            auth: {
                username: username,
                password: password
            }
        });
    }

    async getServerInfo() {
        try {
            console.log(`Making request to http://${ip}:${port}/v1/api/info`);
            const response = await this.api({
                method: 'GET',
                url: '/v1/api/info',
                headers: {
                    'Accept': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    handleError(error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.log(error.response.data);
            throw new Error(error.response.data.message || 'API request failed');
        } else if (error.request) {
            // No response received from server
            throw new Error('No response received from API');
        } else {
            // Other errors
            throw new Error(error.message);
        }
    }
}

const palServerServiceInstance = new palServerService();

module.exports = palServerServiceInstance;