const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const waypointSchema = new Schema({
    name: String,
    location: {
        x: String,
        y: String
    }
});

const Waypoint = mongoose.model('Waypoint', waypointSchema);
module.exports = Waypoint;