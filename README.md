## Prerequisites
Install MongoDB v3.4 (we use this version for development)

Install [PM2](http://pm2.keymetrics.io/)

    npm install pm2 -g

Install nginx


## Deploy the application
    npm install

## Run the application
    pm2 start bin/www

## Stop the application
    pm2 stop bin/www

## Check application status
    pm2 status bin/www
