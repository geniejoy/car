#!/bin/bash
# to be updated to shelljs later for cross-platform

export DEV_HOST=pd1
export DEV_CLIENT="~/webapps/console/"
export DEV_SERVER="~/webapps/services/console-server/"
export DEV_SITES="~/webapps/sites-available/"

# apache2 sites config
# scp -r sites-available/* ${DEV_HOST}:${DEV_SITES}

# back-end service
cd ../server

npm run build:dev
scp -r dist/* ${DEV_HOST}:${DEV_SERVER}
# let server do npm install
# scp -r node_modules ${DEV_HOST}:${DEV_SERVER}

# back to tool
cd ../tool