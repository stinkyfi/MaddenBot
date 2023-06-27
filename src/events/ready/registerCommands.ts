import getApplicationCommands from '../../utils/getApplicationCommands';
import areCommandsDifferent from '../../utils/areCommandsDifferent';
import getLocalCommands from '../../utils/getLocalCommands';
import {
  ApplicationCommandManager,
  Client,
  GuildApplicationCommandManager,
} from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

module.exports = async (client: Client) => {
  try {
    const localCommands = getLocalCommands() as any[];
    const applicationCommands =
      ((await getApplicationCommands(
        client,
        process.env.GUILD_ID!,
      )) as ApplicationCommandManager) || GuildApplicationCommandManager;
    // Takes available commands based on wheter the bot is inside a server
    // or a dm and returns corresponding commands based on ID's

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;
      const existingCommand = await applicationCommands.cache.find(
        (cmd: { name: any }) => cmd.name === name,
      );
      // Checks the cache for applicationCommands and cross references their name with
      // name key added to all localCommands if === then existingCommand : undefined

      if (existingCommand) {
        // Checks for existingCommand
        if (localCommand.deleted) {
          // If localCommand gets scheduled for deletion
          await applicationCommands.delete(existingCommand.id);
          // Existing command inside applicationCommands also gets removed
          console.log(`🗑 Deleted command "${name}".`);
          continue;
        }

        if (areCommandsDifferent(existingCommand, localCommand)) {
          // Compares existingCommand to localCommand to see if they are different
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });
          // And if they are then existingCommand inside applicationCommands can be edited
          console.log(`🔁 Edited command "${name}".`);
        }
      }
 else {
        if (localCommand.deleted) {
          // Else if command doesn't exist and delete command was ran its qued for deletion
          console.log(
            `⏩ Skipping registering command "${name}" as it's set to delete.`,
          );
          continue;
        }

        await applicationCommands.create({
          name,
          description,
          options,
        });
        // Creating new command
        console.log(`👍 Registered command "${name}."`);
      }
    }
  }
 catch (error) {
    console.log(`There was an error: ${error}`);
  }
};
