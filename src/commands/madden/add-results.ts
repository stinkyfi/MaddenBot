import 'dotenv/config';
import { ApplicationCommandOptionType } from 'discord.js';
import Standings from '../../models/Standings';

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (client: any, interaction: any) => {
    console.log(interaction.user.id);
    console.log(interaction.user.id);
    if (interaction.user.id !== process.env.DEV) {
      interaction.reply('You are not allowed to call this command');
      return;
    }
    let user1 = interaction.options.get('user1').value;
    const result = interaction.options.get('result').value;
    let user2 = interaction.options.get('user2').value;

    (async () => {
      try {
        console.log('Adding Results');
        // Users Queries
        const q_user1 = { userId: user1 };
        const q_user2 = { userId: user2 };
        // Find the existing use
        const dbUser1 = (await Standings.findOne(q_user1)) as any;
        const dbUser2 = (await Standings.findOne(q_user2)) as any;
        // Get users
        user1 = client.users.cache.get(`${user1}`);
        user2 = client.users.cache.get(`${user2}`);

        if (result == 'won') {
          Standings.updateOne(q_user1, { wins: dbUser1.wins + 1 }).catch(
            (e: Error) => {
              console.log(`Error saving results ${e}`);
              return;
            }
          );
          Standings.updateOne(q_user2, { loss: dbUser2.loss + 1 }).catch(
            (e: Error) => {
              console.log(`Error saving results ${e}`);
              return;
            }
          );
          interaction.reply('Results Accepted');
        } else if (result == 'loss') {
          Standings.updateOne(q_user2, { wins: dbUser2.wins + 1 }).catch(
            (e: Error) => {
              console.log(`Error saving results ${e}`);
              return;
            }
          );
          Standings.updateOne(q_user1, { loss: dbUser1.loss + 1 }).catch(
            (e: Error) => {
              console.log(`Error saving results ${e}`);
              return;
            }
          );
          interaction.reply('Results Accepted');
        } else {
          Standings.updateOne(q_user1, { draw: dbUser1.draw + 1 }).catch(
            (e: Error) => {
              console.log(`Error saving results ${e}`);
              return;
            }
          );
          Standings.updateOne(q_user2, { draw: dbUser2.draw + 1 }).catch(
            (e: Error) => {
              console.log(`Error saving results ${e}`);
              return;
            }
          );
          interaction.reply('Results Accepted');
        }
      } catch (error) {
        console.log(`Error updating rankings: ${error}`);
      }
    })();
  },
  name: 'add-results',
  description: 'Add game results for a user',
  options: [
    {
      name: 'user1',
      description: 'The first user to add results for',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'result',
      description: 'The user games result',
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: 'beat',
          value: 'won',
        },
        {
          name: 'lost to',
          value: 'loss',
        },
        {
          name: 'tied with',
          value: 'draw',
        },
      ],
      required: true,
    },
    {
      name: 'user2',
      description: 'The second user to add results for',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
};