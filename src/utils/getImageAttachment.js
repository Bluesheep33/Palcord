const path = require('path');
const fs = require('fs');
const { AttachmentBuilder } = require('discord.js');

const imagePath = path.resolve(__dirname, '../resources/palworld.png');
const imageBuffer = fs.readFileSync(imagePath);
module.exports  = new AttachmentBuilder(imageBuffer, { name: 'palworld.png' });
