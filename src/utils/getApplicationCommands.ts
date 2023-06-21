import { Client } from 'discord.js';

const getApplicationCommands = async (
  client: Client | any,
  guildId: string
) => {
  let applicationCommands;

  if (guildId) {
    const guild = await client.guilds.fetch(guildId);
    applicationCommands = guild.commands;
  } else {
    applicationCommands = await client.application.commands;
  }

  await applicationCommands.fetch();
  return applicationCommands;
};

export default getApplicationCommands;
