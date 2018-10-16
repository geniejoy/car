#!/bin/bash
# copy deploy files from dev host to local atm host

export DEV_HOST=pd1
export DEV_CLIENT="~/webapps/console"
export DEV_SERVER="~/webapps/services/console"
export DEV_SITES="~/webapps/sites-available"
export GENIE_CLIENT="/home/genie/webapps/console/"
export GENIE_SERVER="/home/genie/webapps/services/console-server/"
export GENIE_SITES="/home/genie/webapps/sites-available/"

mkdir -p ${GENIE_CLIENT}

# front-end
scp -r ${DEV_HOST}:${DEV_CLIENT}/en ${GENIE_CLIENT}
scp -r ${DEV_HOST}:${DEV_CLIENT}/tw ${GENIE_CLIENT}
scp -r ${DEV_HOST}:${DEV_CLIENT}/jp ${GENIE_CLIENT}
scp -r ${DEV_HOST}:${DEV_CLIENT}/cn ${GENIE_CLIENT}
