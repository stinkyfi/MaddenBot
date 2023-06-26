import { Client, CommandInteraction } from 'discord.js';
import Standings from '../../models/Standings';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (client: Client, interaction: CommandInteraction) => {
    console.log('Get Standings');

    (async () => {
      try {
        let user = '' as any;
        const standings = await Standings.find().sort({
          wins: -1,
          draw: -1,
          loss: 1,
        });
        // Finds standings and sorts them
        let i = 1;
        let str = '# Madden User Rankings \n';
        // Defining the title of standings for users
        for (const s of standings) {
          user = await client.users.fetch(s.userId);
          str += `${i}. ${getRank(s.championships)} ${user.username} \`(${
            s.wins
          }-${s.loss}-${s.draw})\` \n`;
          i++;
        }
        // Retrieves the statistics of users in standings
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

function getRank(chips: number) {
  if (chips == 1) {
    return process.env.EMOJI_STAR;
  }
 else if (chips == 2) {
    return process.env.EMOJI_SUPERSTAR;
  }
 else if (chips > 2) {
    return process.env.EMOJI_XFACTOR;
  }
 else {
    return process.env.EMOJI_NORMAL;
  }
}
