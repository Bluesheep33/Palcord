#!/bin/bash
#run using 'bash start-server.sh' or run 'chmod +x start-server.sh' once and then './start-server.sh'

# Log directory
LOG_DIR="./logs"

# Function to start the server and log the output
../PalServer.sh -useperfthreads -NoAsyncLoadingThread -UseMultithreadForDS 2>&1 | tee -a $LOG_DIR/server.log