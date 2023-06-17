module.exports = async (client: string, guildId: string) => {
  let applicationCommands;

  if (guildId) {
    const guild = (await client.guilds.fetch(guildId)) as string;
    applicationCommands = guild.commands;
  } else {
    applicationCommands = await client.application.commands;
  }

  await applicationCommands.fetch();
  return applicationCommands;
};
