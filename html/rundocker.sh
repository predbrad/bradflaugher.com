#!/bin/bash
# must be ran from inside 'html' folder

sudo rm -rf node_modules
sudo docker build -t sitebuilder .
sudo docker run -v $(pwd):/app -it --rm -p 3000-3001:3000-3001 sitebuilder
