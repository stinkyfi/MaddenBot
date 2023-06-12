require('dotenv').config();
require('discord.js');
const Suspensions = require('../../models/Supensions');
const Crimes = require('../../models/Crimes');

module.exports = {
   /* @param {Client} client
    * @param {Interaction} interaction */
    callback: (client, interaction) => {
      console.log('Get Suspensions');
      (async () => {
      try {
        const suspended = await Suspensions.find();
        const crimeCount = await Crimes.find().count();
        let user = '';
        let str = '# Suspended Users \n';
        for (const s of suspended) {
            if (s.date > new Date()) {
                console.log('expired');
            }
            str += '----------------------------------\n';
            user = await client.users.fetch(s.userId);
            const random = randomNumber(1, crimeCount);
            const crime = await Crimes.find({ id: random }).select('title');
            str += `**Player:** ${user.username}\n**Crime:** ${crime[0].title}\n**Length:** ${s.days} day(s)\n**Issued:** ${s.date}\n`;
            i++;
        }
        interaction.reply(str);
      }
      catch (error) {
        console.log(`Error getting rankings: ${error}`);
      }
    })();
  },
  name: 'get-suspensions',
  description: 'Get list of active suspensions',
  options: [],
};

function randomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}