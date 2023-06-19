import 'dotenv/config';
import 'discord.js';

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (client: any, interaction: any) => {
    console.log('Get Source');
    interaction.reply(process.env.SOURCE);
  },
  name: 'source',
  description: 'Link to Madden Bot Source Code',
  options: [],
};
