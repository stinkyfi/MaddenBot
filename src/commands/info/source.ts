require('dotenv').config();
require('discord.js');
import { Client, CommandInteraction } from 'discord.js';

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (_client: Client, interaction: CommandInteraction) => {
    console.log('Get Source');
    interaction.reply(process.env.SOURCE);
  },
  name: 'source',
  description: 'Link to Madden Bot Source Code',
  options: [],
};
