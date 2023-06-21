import 'dotenv/config';
import 'discord.js';
import { Interaction } from 'discord.js';

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (interaction: Interaction | any) => {
    console.log('Get Source');
    interaction.reply(process.env.SOURCE);
  },
  name: 'source',
  description: 'Link to Madden Bot Source Code',
  options: [],
};
