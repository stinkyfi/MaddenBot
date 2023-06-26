import { Client, CommandInteraction } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (_client: Client, interaction: CommandInteraction) => {
    console.log('Get Source');
    interaction.reply(`${process.env.SOURCE}`);
  },
  name: 'source',
  description: 'Link to Madden Bot Source Code',
  options: [],
};
