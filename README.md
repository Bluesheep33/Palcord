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

Some features are still in development, so they might not work as intended.


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


## Project setup
###### Get source code & dependencies:
- Change directory to `Steam/steamapps/common/PalServer/` (or wherever your Palworld server is stored)
- Run `git clone https://github.com/Bluesheep33/Palcord.git` to add the remote repository
- Make sure you have all dependencies installed
  - Install [Node.js](https://nodejs.org/en/) with `sudo apt install nodejs`
  - Run `npm i` to install all dependencies

###### Set up the discord bot:
- For the discord bot to work, you need to create a bot on the [Discord Developer Portal](https://discord.com/developers/applications)
  - Create a new application
  - Invite the bot to your discord server

###### Set up the palworld api and server log listener:
- Stop the palworld server if it's running
- Set `RESTAPIEnabled` in the `PalworldSettings.ini` to `true` (run the server once to generate the file)
  - This PalworldSettings.ini file can be found under `Pal/Saved/Config/LinuxServer/`
- Set `LogFormatType` in the `PalWorldSettings.ini` file to `Json
- Start the palworld server using the `start-server.sh` file (always use this file to start the server henceforth)
  - This file will start the server and watch for changes in the logs of the server, which is used to get messages from the server chat and relay messages to the discord server

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


## Visual setup guide
YouTube video for guiding through setup will come here


## Pictures
Pictures of the bot will come here


## Closing remarks
Feel free to contribute to this repository by any means. I'm open to suggestions and improvements.

If you have any questions, feel free to open a new issue or ask me on the Discord server: [adaja bots](https://discord.gg/XwEYDmngXF)


## License
This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
