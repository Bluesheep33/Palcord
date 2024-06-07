const mongoose = require('mongoose');

const server = 'localhost:27017';
const database = 'palworld';

module.exports = () => {
    mongoose.connect(`mongodb://${server}/${database}/`).then(() => {
        console.log('Connected to the mongodb palword database');
    })
    .catch((error) => {
        console.error('Error connecting to the mongodb palworld database');
    });
}