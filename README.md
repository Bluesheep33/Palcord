# Palcord
A Discord bot for Palworld servers.


## Quick notes
This project is designed to work for a Palworld server running on a Linux machine (in my case Ubuntu server 22.04).
If you use Windows, you can still use the discord bot, but you should have some general knowledge about computers to set up the project correctly.

Some features are still in development, so there might still be some bugs.
In case you find a bug, please report it in the issues tab of this repository, and I'll try to fix it as soon as possible.

When changing settings in the .ini files, make sure to stop the server before making changes and start it again after saving the changes.
Otherwise, the running server will override your changes to any files.


## Features
- Get a server's general info (ip, port, name, version, description, password)
- Get a server's status: online/offline, player count, uptime, fps, frame time
- Get a server's active player list
- Get a player's info: name, level, location
- Send a message to the server chat via discord
- Admin commands (kick, ban, unban, save, shutdown, force shutdown)
- Get the server settings (e.g. difficulty, max players, death penalty)
- Communicate with the server chat via discord: receive join/leave/chat messages from server and send messages to the server chat


## Possibly coming features
- Store waypoints on the server
- Get a list of all players
- Get info from the paldex (e.g. pal info, paldex entries) using [this](https://github.com/mlg404/palworld-paldex-api) GitHub repository from mlg404


## Project setup
*!!! Don't run the bot before having set up the project !!!*

###### Get source code & dependencies:
- Clone the repository to the computer that you run your palserver on
  - Create a new folder to store the code in
  - Run `git init` to initialize the folder as a git repository
  - Run `git remote add origin git@github.com:Bluesheep33/Palcord.git` to add the remote repository
    - Note that you need to have your ssh key added to your GitHub account to use this command
  - Run `git pull origin main` to pull the code from the repository
- Make sure you have all dependencies installed
  - Install [Node.js](https://nodejs.org/en/)
  - Run `npm i discord.js` to install the discord.js library (used for communicating with discord)
  - Run `npm i axios` to install the axios library (used for communicating with the palworld server)
  - Run `npm i express mongoose` to install the express library and mongoose library (used for the local mongo database)

###### Set up the discord bot:
- For the discord bot to work, you need to create a bot on the [Discord Developer Portal](https://discord.com/developers/applications)
  - Create a new application
  - Invite the bot to your discord server

###### Set up the palworld api:
- For the palworld server api to work, you need to set `RESTAPIEnabled` in the DefaultPalworldSettings.ini to `true`
- If you already ran PalServer.sh once, then you should copy everything from the DefaultPalworldSettings.ini to the PalWorldSettings.ini file
  - This PalworldSettings.ini file can be found under `Pal/Saved/Config/LinuxServer/`
- Start/Restart the palworld server for the api to start working

###### Configure stdout listener:
- Move the `start-server.sh` file to the same directory as the `PalServer.sh` file
- Verify that the path to the `PalServer.sh` file is correct in the `start-server.sh` file
- If you run the discord bot and the palserver with different users, you will need to store console-log.txt in a directory that both users have access to
  - You can do this by creating a new directory and granting both users access to it
  - To make a shared directory in linux, you need to run the following:
    1. `sudo mkdir /var/log/palworld` - creates a new directory
    2. `sudo groupadd palworld` - creates a new group
    3. `sudo usermod -a -G palworld user1` - adds the user `user1` to the group `palworld`
    4. `sudo usermod -a -G palworld user2` - adds the user `user2` to the group `palworld`
    5. `sudo chgrp -R palworld /var/log/palworld` - grant the group `palworld` ownership over the directory
    6. `sudo chmod -R 2775 /var/log/palworld` - grant the directory owner full read/write access
- If the path to where you want your log is not `~/Steam/steamapps/common/PalServer/` (f.e. when Steam isn't downloaded in the home folder of a user, or you need to put the file in /var/log/palworld) then change it to the correct path in both the shell file and in `config_template.json`
- Run `chmod +x start-server.sh` to make the shell file an executable
- Stop the palworld server if it's running
- Set `LogFormatType` in the `PalWorldSettings.ini` file to `Json`
- Start the palworld using the `start-server.sh` file (always use this file to start the server henceforth)
  - This file will start the server and listen to the stdout of the server, which is used to get messages from the server chat and relay join/leave messages to the discord server
- If the console-log.txt file ever gets too big, you can delete it, but make sure to change the number in `src/services/stdoutService/lastLineRead` to 0

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

###### Start the discord bot:
- Run `node index.js` in the src directory to start the bot, or alternatively, use a process manager like [pm2](https://pm2.keymetrics.io/) to keep the bot running
- The global slash commands will take some time to get registered, so ideally wait a few hours max in order for the commands to show


## Pictures
###### Bot commands
![server-info](https://github.com/Bluesheep33/Palcord/assets/75695506/782ad7f7-2159-440b-a42c-a4d0d85a7c8b)

![server-status](https://github.com/Bluesheep33/Palcord/assets/75695506/512bdc2a-e512-452c-95c1-395fbf97fbde)

###### Miscellaneous
![project files](https://github.com/Bluesheep33/Palcord/assets/75695506/125d5c51-815d-4a97-88a5-95c628ef7920)

![console log](https://github.com/Bluesheep33/Palcord/assets/75695506/10bc6327-99ba-4608-aab2-c7fe540591fe)


## Closing remarks
Feel free to contribute to this repository by any means. I'm open to suggestions and improvements.

If you have any questions, feel free to ask me on Discord: @adaja__


## License
This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.