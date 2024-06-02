# _Palcord_
A Discord bot for quickly retrieving info regarding your Palworld server


## Features
- None so far


## Coming Features
- Get a server's status: online/offline, player count, ping
- Get a server's player list
- Get a player's info: name, level, location
- Send a message to the server chat via discord
- Get info from the paldex (e.g. pal info, paldex entries) using [this](https://github.com/mlg404/palworld-paldex-api) GitHub repository from mlg404


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
  - This PalworldSettings.ini file can be found under `Pal/Saved/Config/LinuxServer`. Replace LinuxServer with WindowsServer if you're on Windows
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
- Put the default password of the server in as well
  - If you haven't set a password, you can set one in the PalWorldSettings.ini file
  - If you don't want to use a password, you can leave this field blank
- Lastly, rename the file to `config.json`

###### Start the discord bot:
- Run `node index.js` in the src directory to start the bot, or alternatively, use a process manager like [pm2](https://pm2.keymetrics.io/) to keep the bot running


## Pictures
- TODO: Add pictures of the bot in action


## Closing remarks
Feel free to contribute to this repository by any means. I'm open to suggestions and improvements.

If you have any questions, feel free to ask me on Discord: @adaja__
