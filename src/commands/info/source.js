require('dotenv').config();
require('discord.js');

module.exports = {
   /* @param {Client} client
    * @param {Interaction} interaction */
    callback: (client, interaction) => {
      console.log('Get Source');
      interaction.reply(process.env.SOURCE);
    },
    name: 'source',
    description: 'Link to Madden Bot Source Code',
    options: [],
};