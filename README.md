![palcord](https://github.com/Bluesheep33/Palcord/assets/75695506/585452ff-0e7a-43ff-9155-d74b8f9cc5bc)

# Palcord
A Discord bot for Palworld servers.

This bot can help you with the following:
- Get information about the server (general information and the server's metrics)
- Get information about the players (all players, active players or a specific player)
- Send and receive messages to/from the server chat in Discord
- Moderate the server with use of the Palworld API/RCON


## Quick notes
This project is designed to work for a Palworld server running on a Linux machine.
If you use Windows, you can still use the discord bot, but you will need to do a bit of coding to make the bot work.


Some features are still in development, so there might still be some bugs.
In case you find a bug, please report it in the issues tab of this repository, and I'll try to fix it as soon as possible.


## Features
- Get a server's general info (ip, port, name, version, description, password)
- Get a server's status: online/offline, player count, uptime, fps, frame time
- Get a server's active player list
- Get a player's info: name, level, location
- Communication channel to talk with people in discord and palworld, also view join/leave messages
- Get the server settings (e.g. difficulty, max players, death penalty)
- Admin commands (kick, ban, unban, save, shutdown, force shutdown)


## Coming features
- Get a list of all players
- Link/unlink your discord and palworld account
- Palworld RCON integration
- Get recent server logs
- Store waypoints on the server


## Project setup
*!!! Don't run the bot before having set up the project !!!*

###### Get source code & dependencies:
- Change directory to `Steam/steamapps/common/PalServer/` (or wherever your Palworld server is stored)
- Run `git clone https://github.com/Bluesheep33/Palcord.git` to add the remote repository
- Make sure you have all dependencies installed
  - Install [Node.js](https://nodejs.org/en/) with `sudo apt install nodejs`
  - Run `npm i` to install all dependencies
  - Install [pm2](https://pm2.keymetrics.io/) with `npm install pm2 -g`

###### Set up the discord bot:
- Create a bot on the [Discord Developer Portal](https://discord.com/developers/applications)
- Invite the bot to your discord server

###### Set up the palworld api and server log listener:
- Stop the palworld server if it's running
- Go to the `Pal/Saved/Config/LinuxServer/` directory and open the `PalWorldSettings.ini` file
  - Set `RESTAPIEnabled` to `true`
  - Set `LogFormatType` to `Json`

###### Create database:
- We need a database to store waypoints and player info, for this we will use MongoDB
- Install MongoDB on your server by following the instructions on the [MongoDB website](https://www.mongodb.com/try/download/community)
  - If you're using ubuntu server, you can follow the rest of these instructions. If you're using a different OS, you can find the instructions on the MongoDB website in case the installation process is different
- Input the version, platform and package in the MongoDB website to get the correct installation link
  - For me, it's Ubuntu 22.04, version 7.0.11, and package Server
- Copy the link and run the following commands in the terminal:
  1. `wget <link>` - download the package
  2. `sudo dpkg -i <package>` - install the package. for the package name, type in mongodb and press tab to autocomplete
- Start the MongoDB service by running `sudo systemctl start mongod`
  - Enable the service to start on boot by running `sudo systemctl enable mongod`, or if you don't want it to start on boot, you can skip this step and start the service manually each time
- Check the status of the service by running `sudo systemctl status mongod`, it should say `active (running)`
- Go back to the [MongoDB website](https://www.mongodb.com/try/download/community) and click on the `Tools/MongoDB Shell` tab
- Input the version, platform and package in the MongoDB website to get the correct installation link
  - For me, it's Debian (10+) / Ubuntu (18.04+) x64, version 2.2.6, and package deb
- Copy the link and run the following commands in the terminal:
  1. `wget <link>` - download the package
  2. `sudo dpkg -i <package>` - install the package. for the package name, type in mongodb-mongosh and press tab to autocomplete
- Run `mongosh` in the terminal to start the MongoDB shell 
  - It should say `connecting to: mongodb://127.0.0.1:27017`

###### Configure the json file:
- Copy the discord bot token and put it in the `config_template.json` file
  - This token can be found on the [Discord Developer Portal](https://discord.com/developers/applications) under the `Bot` tab of your application
- Copy your discord user id and put it under `adminId`
  - This is for the bot to know who the server admin is and to allow you to use the admin commands 
- Put the rest api server ip and port in this same file
  - If you're running the server on the same computer as the bot, you can use `localhost` or `127.0.0.1` as the ip. Otherwise, put the ip of the other computer running the server.
  - Note that the port should be the port that the rest api is running on, not the palserver port. By default, this port is `8212`
- Put the username and password of the server admin in this file
  - The username is `admin` by default, the password is the same as the one you use to log into the server as admin (the one you set in the server settings)
    - If you haven't set a password, you can set one in the PalWorldSettings.ini file 
  - Note that the password is stored in plain text in the config file, so make sure you keep this file secure from others
- Put the public ip of your Palworld server under publicIp
  - This is used to display the ip of the server in the bot's server info command
- Put the default password of the server in as well
  - If you haven't set a password, you can set one in the PalWorldSettings.ini file
  - If you don't want to use a password, you can leave this field blank
- channelId should be set to the id of the discord channel where the bot will send messages from the server chat
  - You can get this id by right-clicking on the channel and clicking copy id
- Lastly, rename the file to `config.json`

###### Start the server and discord bot:
- Always use the `start-server-and-bot.sh` script to start the server and bot
- The global slash commands will take some time to get registered when running for the first time, after a few hours the commands will show


## Visual setup guide
YouTube video for guiding through setup will come here


## Pictures
Pictures of the bot will come here


## Closing remarks
Feel free to contribute to this repository by any means. I'm open to suggestions and improvements.

If you have any questions, feel free to open a new issue or ask me on the Discord server: [adaja bots](https://discord.gg/XwEYDmngXF)


## License
This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
