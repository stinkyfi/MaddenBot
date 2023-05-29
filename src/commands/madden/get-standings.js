require('dotenv').config();
require('discord.js');
const Standings = require('../../models/Standings');

module.exports = {
   /* @param {Client} client
    * @param {Interaction} interaction */
    callback: (client, interaction) => {
      console.log('Get Standings');

      (async () => {
      try {
        let user = '';
        const standings = await Standings.find().sort({ wins: -1, draw: -1, loss: 1 });
        let i = 1;
        let str = '# Madden User Rankings \n';
        for (const s of standings) {
            user = await client.users.fetch(s.userId);
            str += `${i}. ${getRank(s.championships)} ${user.username} \`(${s.wins}-${s.loss}-${s.draw})\` \n`;
            i++;
        }
        interaction.reply(str);

      }
      catch (error) {
        console.log(`Error getting rankings: ${error}`);
      }
    })();
  },
  name: 'get-standings',
  description: 'Get the User vs. User Standings',
  options: [],
};

function getRank(chips) {
  if (chips == 1) { return process.env.EMOJI_STAR; }
  else if (chips == 2) {return process.env.EMOJI_SUPERSTAR; }
  else if (chips > 2) { return process.env.EMOJI_XFACTOR; }
  else { return process.env.EMOJI_NORMAL; }
}