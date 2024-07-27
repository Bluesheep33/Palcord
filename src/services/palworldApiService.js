const { ip, port, username, password } = require('../../config.json');
const axios = require('axios');

class palworldApiService {
    /**
     * Creates a new instance of the palworldApiService
     */
    constructor() {
        this.api = axios.create({
            baseURL: `http://${ip}:${port}/v1/api`,
            maxBodyLength: Infinity,
            auth: {
                username: username,
                password: password
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    /**
     * Gets the info from the server
     * @returns {Promise<any>} The info from the server
     */
    async getInfo() {
        try {
            console.log(`Making request to http://${ip}:${port}/v1/api/info`);
            const response = await this.api({
                method: 'GET',
                url: '/info',
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Gets the players from the server
     * @returns {Promise<any>} The players from the server
     */
    async getPlayers() {
        try {
            console.log(`Making request to http://${ip}:${port}/v1/api/players`);
            const response = await this.api({
                method: 'GET',
                url: '/players'
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Gets the settings from the server
     * @returns {Promise<any>} The settings from the server
     */
    async getSettings() {
        try {
            console.log(`Making request to http://${ip}:${port}/v1/api/settings`);
            const response = await this.api({
                method: 'GET',
                url: '/settings'
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Gets the metrics from the server
     * @returns {Promise<any>} The metrics from the server
     */
    async getMetrics() {
        try {
            console.log(`Making request to http://${ip}:${port}/v1/api/metrics`);
            const response = await this.api({
                method: 'GET',
                url: '/metrics'
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Posts a message to the server
     * @param message {string} The message to post
     * @returns {Promise<any>} The response from the server
     */
    async announce(message) {
        try {
            console.log(`Making request to http://${ip}:${port}/v1/api/announce`);
            const response = await this.api({
                method: 'POST',
                url: '/announce',
                data: {
                    message: message
                }
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Kicks a player from the server
     * @param userid {string} The user ID to kick
     * @param message {string} The message to send to the kicked player
     * @returns {Promise<any>} The response from the server
     */
    async kick(userid, message) {
        try {
            console.log(`Making request to http://${ip}:${port}/v1/api/kick`);
            const response = await this.api({
                method: 'POST',
                url: '/kick',
                data: {
                    userid: userid,
                    message: message
                }
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Bans a player from the server
     * @param userid {string} The user ID to ban
     * @param message {string} The message to send to the banned player
     * @returns {Promise<any>} The response from the server
     */
    async ban(userid, message) {
        try {
            console.log(`Making request to http://${ip}:${port}/v1/api/ban`);
            const response = await this.api({
                method: 'POST',
                url: '/ban',
                data: {
                    userid: userid,
                    message: message
                }
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Unbans a player from the server
     * @param userid {string} The user ID to unban
     * @returns {Promise<any>} The response from the server
     */
    async unban(userid) {
        try {
            console.log(`Making request to http://${ip}:${port}/v1/api/unban`);
            const response = await this.api({
                method: 'POST',
                url: '/unban',
                data: {
                    userid: userid
                }
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Saves the world on the server
     * @returns {Promise<any>} The response from the server
     */
    async save() {
        try {
            console.log(`Making request to http://${ip}:${port}/v1/api/save`);
            const response = await this.api({
                method: 'POST',
                url: '/save'
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Shuts down the server
     * @returns {Promise<any>} The response from the server
     */
    async shutdown(waittime, message) {
        try {
            console.log(`Making request to http://${ip}:${port}/v1/api/shutdown`);
            const response = await this.api({
                method: 'POST',
                url: '/shutdown',
                data: {
                    waittime: waittime,
                    message: message
                }
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Force stops the server
     * @returns {Promise<any>} The response from the server
     */
    async stop() {
        try {
            console.log(`Making request to http://${ip}:${port}/v1/api/stop`);
            const response = await this.api({
                method: 'POST',
                url: '/stop'
            });
            return response.data;
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Handles errors from the API
     * @param error {Error} The error to handle
     */
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


// Export the palworldApiService as a singleton
const palworldApiServiceInstance = new palworldApiService();
module.exports = palworldApiServiceInstance;
