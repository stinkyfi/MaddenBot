require('dotenv').config();
require('discord.js');
import { CommandInteraction } from 'discord.js';

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (interaction: CommandInteraction) => {
    console.log('Get Source');
    interaction.reply(process.env.SOURCE);
  },
  name: 'source',
  description: 'Link to Madden Bot Source Code',
  options: [],
};
