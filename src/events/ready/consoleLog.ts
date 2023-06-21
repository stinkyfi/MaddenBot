import { Client } from 'discord.js';

const consoleLog = (client: Client | any) => {
  console.log(`${client.user.tag} is online.`);
};

export default consoleLog;
