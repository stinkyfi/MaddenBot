require('dotenv').config();
require('discord.js');

module.exports = {
   /* @param {Client} client
    * @param {Interaction} interaction */
    callback: (client, interaction) => {
      console.log('Bug/Feature Link');
      interaction.reply(process.env.SOURCE + '/issues');
    },
    name: 'open-ticket',
    description: 'Submit Bug or Feature Request',
    options: [],
};