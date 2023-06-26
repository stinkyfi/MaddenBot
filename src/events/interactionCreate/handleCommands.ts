import { Client, Guild, GuildMember, Interaction } from 'discord.js';
import getLocalCommands from '../../utils/getLocalCommands';
import { devs } from '../../../config.json';
import dotenv from 'dotenv';
dotenv.config();

module.exports = async (client: Client, interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  // If interaction is not a chat input command then thats it.
  const localCommands = getLocalCommands() as any[];

  try {
    const commandObject = localCommands.find(
      (cmd: { name: any }) => cmd.name === interaction.commandName
    )!;
    // If interaction name is the same as one local command thats the commandObject
    if (!commandObject) return;
    // If commandObject undefined then command doesn't exist yet
    if (commandObject.devOnly) {
      // If the command is only dev accesible
      if (
        !(devs as string[]).includes((interaction.member as GuildMember).id)
      ) {
        // The list of devs is checked for the ID of the member running the command
        interaction.reply({
          content: 'Only developers are allowed to run this command.',
          ephemeral: true,
        });
        // If they are not a dev they get this message
        return;
      }
    }

    if (commandObject.testOnly) {
      // If the command is for test only
      if (!((interaction.member as GuildMember).id === process.env.GUILD_ID)) {
        // And the member ID is not the same servers ID (possibly referring to test commands being able
        // to run inside DM's or ? maybe a mock server ? )
        interaction.reply({
          content: 'This command cannot be ran here.',
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      // If the command has are required permisions
      for (const permission of commandObject.permissionsRequired) {
        // All permisions are checked
        if (!(interaction.member as GuildMember).permissions.has(permission)) {
          // And members interacting with the bot are checked for permisions
          interaction.reply({
            content: 'Not enough permissions.',
            ephemeral: true,
          });
          // And if they don't they get this message
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      // Now the command is checked to see if its got botPermisions
      for (const permission of commandObject.botPermissions) {
        // It checks thru them
        const bot = (interaction.guild as Guild).members.me;
        // Bot is a way for the bot to get its own ID when interacting
        if (!(bot as GuildMember).permissions.has(permission)) {
          // And if its not allowed to do x action
          interaction.reply({
            content: 'I do not have enough permissions.',
            ephemeral: true,
          });
          // It returns this
          return;
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};
