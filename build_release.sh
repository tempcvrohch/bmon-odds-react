#!/bin/bash

# TODO: fix the tsc build errors in ./src/openapi/api/index.ts
# echo "export { LoginRequest, RegisterRequest } from './UserApi.js'" >> ./src/openapi/api/index.ts
# might be better to put this in the openapi-conf project

export PORT=3000
envsubst < Dockerfile | tee /dev/tty | docker build -t bmon-odds/frontend:latest -f - .