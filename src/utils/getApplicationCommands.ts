import { Client } from 'discord.js';

const getApplicationCommands = async (client: Client, guildId: string) => {
  let applicationCommands;

  if (guildId) {
    const guild = await client.guilds.fetch(guildId);
    applicationCommands = guild.commands;
  }
 else {
    applicationCommands = await client.application!.commands;
  }
  // Checking to see if the bot is inside a server or private DM before showing
  // respective commands for chat

  await applicationCommands.fetch(applicationCommands as any);
  return applicationCommands;
};

module.exports = getApplicationCommands;
export default getApplicationCommands;
