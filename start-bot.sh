#!/bin/bash
#run the bot using 'bash start-bot.sh' or run 'chmod +x start-bot.sh' once and then './start-bot.sh'

# Log directory
LOG_DIR="./logs"

# Function to start the bot and log the output
pm2 start src/index.js --name palcord --log $LOG_DIR/bot.log
pm2 save