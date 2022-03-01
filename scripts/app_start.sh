#!/bin/bash

### This script is used to restart the application

cd /home/ubuntu/narrative_backend
           
echo "Installing new pakages"
npm install 
          
echo "Starting Server"
npm run start
          
echo "Deployment Completed and pm2 to keep app running"
pm2 --name narrative_backend start npm -- start
