# Palcord
A Discord bot for quickly retrieving info regarding your Palworld server

### Features
- None so far

### Coming Features
- Get a server's status: online/offline, player count, ping
- Get a server's player list
- Get a player's info: name, level, location
- Send a message to the server chat via discord
- Get info from the paldex (e.g. pal info, paldex entries) using [this](https://github.com/mlg404/palworld-paldex-api) GitHub repository from mlg404

### Project setup
- Clone the repository to the computer that you run your palserver on
  - Create a new folder to store the code in
  - Run `git init` to initialize the folder as a git repository
  - Run `git remote add origin git@github.com:Bluesheep33/Palcord.git` to add the remote repository
  - Run `git pull origin main` to pull the code from the repository
- Make sure you have all dependencies installed
  - Install [Node.js](https://nodejs.org/en/)
  - Run npm fund to see what dependencies you need to install
    - For each dependency, run `npm install <dependency>` to install it
- For the discord bot to work, you need to create a bot on the [Discord Developer Portal](https://discord.com/developers/applications)
  - Create a new application
  - Invite the bot to your discord server
- Copy the bot token and put it in the `config_template.json` file
- For the palworld server api to work, you need to set RESTAPIEnabled in the PalWorldSettings.ini to true
  - If you can't find the file, run the server once, and it should generate the file under `Pal/Saved/Config/WindowsServer` (or something similar if you're not on Windows)
- Put the server ip and port in the `config_template.json` file
  - If you're running the server on the same computer as the bot like instructed, you can use `localhost` as the ip. Otherwise, put the ip of the other computer running the server. 
  - Note that the port should be the port that the rest api is running on, not the palserver port. By default, this port is `8212`
- After you put the bot token and the ip + port of the api in `config_template.json`, rename the file to `config.json`
- Run `node index.js` in the src directory to start the bot, or alternatively, use a process manager like [pm2](https://pm2.keymetrics.io/) to keep the bot running

### Pictures
- TODO: Add pictures of the bot in action

### Closing remarks
Feel free to contribute to this repository by any means. I'm open to suggestions and improvements.