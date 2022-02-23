#!/bin/bash

### This script is used to restart the application

cd /home/ubuntu/corniehealth-backend
           
echo "Installing new pakages"
npm install 
          
echo "Starting Server"
npm run start
          
echo "Deployment Completed and pm2 to keep app running"
pm2 --name corniehealth-backend start npm -- start
