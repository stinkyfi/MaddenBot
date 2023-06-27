import { Client, CommandInteraction } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (_client: Client, interaction: CommandInteraction) => {
    console.log('Hellbent Waifu');

    (async () => {
      try {
        const embed = new EmbedBuilder()
          .setTitle('Skull Merchant starts a Chant')
          .setDescription('THWACK! THEM! HELLBENT!')
          .setImage('https://i.ibb.co/m6Q7bRB/Store-Skull-Merchant.png')
          .setColor(0x000e7a)
          .addFields({
            name: 'Hellbent Gains:',
            value: '+10% Confidence',
          });
        // Creates embed file for command
        await interaction.reply({ embeds: [embed] });
        // Replies with embed
      } catch (error) {
        console.log(`Error Displaying User: ${error}`);
      }
    })();
  },
  name: 'hellbent-waifu',
  description: 'Summon Hellbents Waifu, to cheer him on!',
};
