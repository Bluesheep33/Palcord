# Palcord
A Discord bot for Palworld servers.
This bot can help you with the following:
- Get information about the server (general information and the server's metrics)
- Get information about the players (all players, active players or a specific player)
- Send and receive messages to/from the server chat (coming soon)
- Moderate the server (coming soon)


## Quick note
This project is designed to work for a Palworld server running on a Linux machine.
If you use Windows, you can still use the discord bot, but you should create a bat file for the stdout listener instead of the shell script.


## Features
- Get a server's general info (ip, port, name, version, description, password)
- Get a server's status: online/offline, player count, uptime, fps, frame time
- Get a server's active player list
- Get a player's info: name, level, location
- Send a message to the server chat via discord


## Possibly coming features
- Get a list of all players
- Optional communication channel feature on discord to talk with people in palworld without having to join game or vice versa
- Get the server settings (e.g. difficulty, max players, death penalty)
- Admin commands (kick, ban, unban, save, shutdown, force shutdown)
- Get info from the paldex (e.g. pal info, paldex entries) using [this](https://github.com/mlg404/palworld-paldex-api) GitHub repository from mlg404
- Get info from the palserver console (join messages, leave messages)


## Project setup
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

###### Set up the discord bot:
- For the discord bot to work, you need to create a bot on the [Discord Developer Portal](https://discord.com/developers/applications)
  - Create a new application
  - Invite the bot to your discord server

###### Set up the palworld api:
- For the palworld server api to work, you need to set `RESTAPIEnabled` in the DefaultPalworldSettings.ini to `true`
- If you already ran PalServer.sh once, then you should copy everything from the DefaultPalworldSettings.ini to the PalWorldSettings.ini file
  - This PalworldSettings.ini file can be found under `Pal/Saved/Config/LinuxServer`
- Start/Restart the palworld server for the api to start working

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
  - If the path is incorrect (f.e. when Steam isn't downloaded in the home folder of a user, or you need to put the file in /var/log/palworld) then change it to the correct path in both the shell file and `src/services/stdoutWatcher.js` 
- Run `chmod +x start-server.sh` to make the shell file an executable
- Stop the palworld server if it's running and start it henceforth using the `start-server.sh` file
  - This file will start the server and listen to the stdout of the server, which is used to get messages from the server chat and relay join/leave messages to the discord server

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
