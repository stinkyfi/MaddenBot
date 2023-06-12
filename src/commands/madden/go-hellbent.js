require('dotenv').config();
const { EmbedBuilder } = require('discord.js');

module.exports = {
    /* @param {Client} client
     * @param {Interaction} interaction */
    callback: (client, interaction) => {
      console.log('Hellbent Waifu');

      (async () => {
      try {
          const embed = new EmbedBuilder()
          .setTitle('Skull Merchant starts a Chant')
          .setDescription('THWACK! THEM! HELLBENT!')
          .setImage('https://i.ibb.co/m6Q7bRB/Store-Skull-Merchant.png')
          .setColor(0x000e7a)
          .addFields(
            {
              name: 'Hellbent Gains:',
              value: '+10% Confidence',
            },
          );
          await interaction.reply({ embeds: [embed] });
      }
      catch (error) {
        console.log(`Error Displaying User: ${error}`);
      }
    })();
  },
  name: 'hellbent-waifu',
  description: 'Summon Hellbents Waifu, to cheer him on!',
};