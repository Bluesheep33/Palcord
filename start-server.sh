#!/bin/bash
#run using 'bash start-server.sh' or run 'chmod +x start-server.sh' once and then './start-server.sh'
~/Steam/steamapps/common/PalServer/PalServer.sh -useperfthreads -NoAsyncLoadingThread -UseMultithreadForDS 2>&1 | tee -a ~/Steam/steamapps/common/PalServer/console-log.txt