import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.TOKEN as string;
const clientId = process.env.CLIENT_ID as string;
const guildId = process.env.TEST_GUILD_ID as string;
const rest = new REST({ version: '9' }).setToken(token);

rest
  .get(Routes.applicationGuildCommands(clientId, guildId))
  // Retrieves commands available on the server or in DM
  .then((data: any) => {
    const promises = [];
    for (const command of data) {
      const deleteUrl = `${Routes.applicationGuildCommands(
        clientId,
        guildId,
      )}/${command.id}` as any;
      /* const deleteUrl = Routes.applicationGuildCommands(
        clientId,
        guildId
      ).toString.concat('/', command.id.toString)
      */
      // Deletes selected command from data
      promises.push(rest.delete(deleteUrl));
    }
    return Promise.all(promises);
  });
