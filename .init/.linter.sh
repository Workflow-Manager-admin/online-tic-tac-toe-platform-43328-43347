#!/bin/bash
cd /home/kavia/workspace/code-generation/online-tic-tac-toe-platform-43328-43347/tic_tac_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

