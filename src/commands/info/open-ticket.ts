import { Client, CommandInteraction } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (_client: Client, interaction: CommandInteraction) => {
    console.log('Bug/Feature Link');
    interaction.reply(`${process.env.SOURCE}/issues`);
  },
  name: 'open-ticket',
  description: 'Submit Bug or Feature Request',
  options: [],
};
