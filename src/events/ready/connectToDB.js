const mongoose = require('mongoose');
const express = require('express');
const Waypoint = require('../../server/models/waypoint');
const Player = require('../../server/models/player');

const app = express();

const server = 'localhost:27017';
const database = 'palworld';

module.exports = () => {
    // Connect to the mongodb palworld database
    mongoose.connect(`mongodb://${server}/${database}`).then(() => {
        console.log('Connected to the mongodb palword database');
        app.listen(3000);
    })
    .catch((error) => {
        console.error('Error connecting to the mongodb palworld database');
    });

    // Set the view engine to ejs
    app.set('view engine', 'ejs');

    // Mongoose CRUD routes
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

    app.get('/update-waypoint', async (req, res) => {
        const name = req.body.name;
        const location = req.body.location;
        Waypoint.updateOne({ name: name }, { location: location })
            .then((r) => {
                res.send(r);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    app.get('/get-waypoints', async (req, res) => {
        Waypoint.find()
            .then((r) => {
                res.send(r);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    app.get('/get-waypoint', async (req, res) => {
        const name = req.body.name;
        Waypoint.findOne({ name: name })
            .then((r) => {
                res.send(r);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    app.delete('/delete-waypoint', async (req, res) => {
        const name = req.body.name;
        Waypoint.deleteOne({ name: name })
            .then((r) => {
                res.send(r);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    app.get('/add-player', async (req, res) => {
        const player = req.body;
        player.save()
            .then((r) => {
                res.send(r);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    app.get('/update-player', async (req, res) => {
        const name = req.body.name;
        const location = req.body.location;
        Player.updateOne({ name: name }, { location: location })
            .then((r) => {
                res.send(r);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    app.get('/get-players', async (req, res) => {
        Player.find()
            .then((r) => {
                res.send(r);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    app.get('/get-player', async (req, res) => {
        const name = req.body.name
        Player.findOne({name: name})
            .then((r) => {
                res.send(r);
            })
            .catch((error) => {
                console.error(error);
            });
    });

    app.delete('/delete-player', async (req, res) => {
        const name = req.body.name;
        Player.deleteOne({name: name})
            .then((r) => {
                res.send(r);
            })
            .catch((error) => {
                console.error(error);
            });
    });
}