require('dotenv').config();
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');
import { Client } from 'discord.js';

module.exports = async (client: Client | any) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(
      client,
      process.env.GUILD_ID
    );
    //Takes available commands based on wheter the bot is inside a server
    //or a dm and returns corresponding ID's

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd: { name: any }) => cmd.name === name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑 Deleted command "${name}".`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`🔁 Edited command "${name}".`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            `⏩ Skipping registering command "${name}" as it's set to delete.`
          );
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });

        console.log(`👍 Registered command "${name}."`);
      }
    }
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};
