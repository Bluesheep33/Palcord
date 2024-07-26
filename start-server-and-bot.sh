#!/bin/bash
#run using 'bash start-server-and-bot.sh' or run 'chmod +x start-server-and-bot.sh' once and then './start-server-and-bot.sh'

# Path to PalServer start script
PALSERVER_START_SCRIPT="./start-server.sh"

# Path to bot start script
BOT_START_SCRIPT="./start-bot.sh"

# Function to start PalServer
start_palserver() {
    echo "Starting PalServer..."
    bash $PALSERVER_START_SCRIPT
    echo "PalServer started. Logs are being written to $LOG_DIR/palserver.log"
}

# Function to start the bot
start_bot() {
    echo "Starting bot..."
    bash $BOT_START_SCRIPT
    echo "Bot started. Logs are being written to $LOG_DIR/bot.log"
}

# Start PalServer and bot
start_palserver
start_bot

echo "PalServer and bot are now running."