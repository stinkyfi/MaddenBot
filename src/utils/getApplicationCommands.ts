import {
  ApplicationCommandManager,
  Client,
  ClientApplication,
  GuildApplicationCommandManager,
} from 'discord.js';

module.exports = async (client: Client, guildId: string) => {
  let applicationCommands;

  if (guildId) {
    const guild = await client.guilds.fetch(guildId);
    applicationCommands = guild.commands as GuildApplicationCommandManager;
  } else {
    applicationCommands = (await (client.application as ClientApplication)
      .commands) as ApplicationCommandManager;
  }
  //Checking to see if the bot is inside a server or private DM before showing
  //respective commands for chat

  await fetch(applicationCommands as any);
  return applicationCommands;
};
