const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: String,
    playerId: String,
    userId: String,
    ip: String,
    location: {
        x: String,
        y: String
    },
    level: String
});

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;