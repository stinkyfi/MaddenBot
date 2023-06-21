import { Client } from 'discord.js';

module.exports = (client: Client | any) => {
  console.log(`${client.user.tag} is online.`);
};
