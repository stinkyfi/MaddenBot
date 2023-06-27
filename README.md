# Madden Bot

This bot was created to assist in Madden User Leagues.

## Commands

---

All commands can be found in `src/commands`, organized into folders like `/madden`.
In order to request a new command, open a ticket on github.

## Install

---

- Clone Repo

```sh
git clone https://github.com/stinkyfi/MaddenBot.git
cd MaddenBot
```

- Install requirements

```sh
npm install
```

- Create `.env` and `config.json` according to

```sh
.env.sample and sample.config.json
```

- You will need to create a discord application and then a bot, here is the link : https://discord.com/developers/applications/

- Following that populate `.env` and `config.json` with the relevant information, that being:

```
  - The previously created bot connection token
  - The GuildID aka Server ID of the server you plan to deploy bot at
  - The ClientID being your Discord ID
  - Your MongoDB connect URL
  - Dev refers to the users with rights to modify or access bot
```

- Create bot invite link

- Add the bot to your DM or Server

- Run bot

```sh
node ./src/index.js
```

- Or run bot in dev mode

```sh
nodemon
```
