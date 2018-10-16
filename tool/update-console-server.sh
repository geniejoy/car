#!/bin/bash
# copy deploy files from dev host to local atm host

export DEV_HOST=pd1
export DEV_CLIENT="~/webapps/console"
export DEV_SERVER="~/webapps/services/console"
export DEV_SITES="~/webapps/sites-available"
export GENIE_CLIENT="/home/genie/webapps/console/"
export GENIE_SERVER="/home/genie/webapps/services/console-server/"
export GENIE_SITES="/home/genie/webapps/sites-available/"

# apache2 sites config
scp -r ${DEV_HOST}:${DEV_SITES}/* ${GENIE_SITES}
scp -r ${DEV_HOST}:${DEV_SITES}/* /etc/apache2/sites-available/

mkdir -p ${GENIE_SERVER}

# back-end
scp -r ${DEV_HOST}:${DEV_SERVER}/* ${GENIE_SERVER}
