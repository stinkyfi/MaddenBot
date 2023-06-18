const getApplicationCommands = async (client: any, guildId: any) => {
  let applicationCommands: any;

  if (guildId) {
    const guild = (await client.guilds.fetch(guildId)) as any;
    applicationCommands = guild.commands;
  } else {
    applicationCommands = await client.application.commands;
  }

  await applicationCommands.fetch();
  return applicationCommands;
};

export default getApplicationCommands;
