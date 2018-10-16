#!/bin/bash
# to be updated to shelljs later for cross-platform

export DEV_HOST=pd1
export DEV_CLIENT="~/webapps/console/"
export DEV_SERVER="~/webapps/services/console-server/"
export DEV_SITES="~/webapps/sites-available/"

# apache2 sites config
# scp -r sites-available/* ${DEV_HOST}:${DEV_SITES}

# front-end app
cd ../
npm run build:en
npm run build:tw
npm run build:jp
npm run build:cn

# rm dist/tw/stats.json
rm  dist/en/*.map
rm  dist/tw/*.map 
rm  dist/jp/*.map
rm  dist/cn/*.map

scp -r dist/* ${DEV_HOST}:${DEV_CLIENT}

# back to tool
cd ../tool