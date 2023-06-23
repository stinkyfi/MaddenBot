require('dotenv').config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.TEST_GUILD_ID;
const rest = new REST({ version: '9' }).setToken(token);

rest
  .get(Routes.applicationGuildCommands(clientId, guildId))
  //Retrieves commands available on the server or in DM
  .then((data: any) => {
    const promises = [];
    for (const command of data) {
      const deleteUrl = `${Routes.applicationGuildCommands(
        clientId,
        guildId
      )}/${command.id}`;
      //Deletes selected command from data
      promises.push(rest.delete(deleteUrl));
    }
    return Promise.all(promises);
  });
