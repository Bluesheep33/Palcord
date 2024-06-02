#!/bin/bash
~/Steam/steamapps/common/PalServer/PalServer.sh -useperfthreads -NoAsyncLoadingThread -UseMultithreadForDS 2>&1 | tee -a ~/Steam/steamapps/common/PalServer/console-log.txt