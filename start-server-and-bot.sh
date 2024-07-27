#!/bin/bash
#run using 'bash start-server-and-bot.sh' or run 'chmod +x start-server-and-bot.sh' once and then './start-server-and-bot.sh'

# Path to PalServer start script
PALSERVER_START_SCRIPT="./start-server.sh"

# Path to bot start script
BOT_START_SCRIPT="./start-bot.sh"

# Log directory
LOG_DIR="./logs"

# Function to start PalServer
start_palserver() {
    echo "Starting Palworld Server..."
    bash $PALSERVER_START_SCRIPT & PALSERVER_PID=$!
    echo "Palworld Server started with PID $PALSERVER_PID. Logs are being written to $LOG_DIR/server.log"
}

# Function to start the bot
start_bot() {
    echo "Starting Palcord..."
    bash $BOT_START_SCRIPT & BOT_PID=$!
    echo "Palcord started with PID $BOT_PID. Logs are being written to $LOG_DIR/bot.log"
}

# Start PalServer and bot
start_palserver
start_bot

echo "Palworld Server and Palcord are now running."

# Function to stop both services
stop_services() {
    echo "Stopping Palworld Server and Palcord..."
    kill $PALSERVER_PID
    pm2 stop palcord
    echo "Services stopped."
}

# Trap CTRL+C and stop services
trap stop_services SIGINT

# Wait for Server to stop
wait

# Wait for the Server to fully shutdown
sleep 3

echo "Shutdown complete."
