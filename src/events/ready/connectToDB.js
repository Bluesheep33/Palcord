const mongoose = require('mongoose');
const express = require('express');
const Waypoint = require('../../server/models/waypoint');
const Player = require('../../server/models/player');

const app = express();

const server = 'localhost:27017';
const database = 'palworld';

module.exports = () => {
    // Connect to the mongodb palworld database
    mongoose.connect(`mongodb://${server}/${database}/`).then(() => {
        console.log('Connected to the mongodb palword database');
        app.listen(3000);
    })
    .catch((error) => {
        console.error('Error connecting to the mongodb palworld database');
    });

    // Set the view engine to ejs
    app.set('view engine', 'ejs');

    // Mongoose routes
    app.get('/add-waypoint', async (req, res) => {
        const waypoint = req.body;
        waypoint.save()
            .then((r) => {
                res.send(r);
            })
            .catch((error) => {
                console.error(error);
            });
    });
}