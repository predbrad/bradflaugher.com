#!/bin/bash
# must be ran from inside 'html' folder

sudo rm -rf node_modules

read -r -p "Do you want to rebuild the docker container? [Y/n] " input

case $input in
      [yY][eE][sS]|[yY])
            echo "You say Yes"
            sudo docker build -t sitebuilder .
            ;;
      [nN][oO]|[nN])
            echo "You say No"
            ;;
      *)
            echo "Invalid input..."
            exit 1
            ;;
esac

sudo docker run -v $(pwd):/app -v /app/node_modules -it --rm -p 3000-3001:3000-3001 sitebuilder
