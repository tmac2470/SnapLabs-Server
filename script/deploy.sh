#!/bin/sh
#
# ---------------------------------------------------------------------
# SnapLabs start script.
# ---------------------------------------------------------------------
#
git pull
npm install
gulp
pm2 stop www
pm2 start bin/www
