import { Client, CommandInteraction } from 'discord.js';
import Suspensions from '../../models/Suspensions';
import Crimes from '../../models/Crimes';
import dotenv from 'dotenv';
dotenv.config();
import 'discord.js';

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (client: Client, interaction: CommandInteraction) => {
    console.log('Get Suspensions');
    (async () => {
      try {
        const suspended = await Suspensions.find();
        // Retrieves suspensions
        const crimeCount = await Crimes.find().count();
        // Retrieves crime count

        let user = '' as any;
        let str = '# Suspended Users \n';
        for (const s of suspended) {
          if ((s.date as Date) > new Date()) {
            console.log('expired');
          }
          // If suspension date is higher than new Date suspension expired
          str += '----------------------------------\n';
          user = await client.users.fetch(s.userId);
          // Fetches susppended users ID
          const random = randomNumber(1, crimeCount);
          const crime = await Crimes.find({ id: random }).select('title');
          // Chooses a random crime
          str += `**Player:** ${user.username}\n**Crime:** ${crime[0].title}\n**Length:** ${s.days} day(s)\n**Issued:** ${s.date}\n`;
        }
        // Attributes crime to user and lets them know thru chat message
        interaction.reply(str);
      } catch (error) {
        console.log(`Error getting rankings: ${error}`);
      }
    })();
  },
  name: 'get-suspensions',
  description: 'Get list of active suspensions',
  options: [],
};

function randomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min);
}
