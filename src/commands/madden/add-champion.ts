import { CommandInteraction, Client } from 'discord.js';

const { ApplicationCommandOptionType } = require('discord.js');
const Standings = require('../../models/Standings');

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (client: Client, interaction: CommandInteraction) => {
    if (interaction.user.id !== process.env.DEV) {
      // If user doesn't exist in DEV they don't have privileges
      interaction.reply('You are not allowed to call this command');
      // Therefore they can't call the command
      return;
    }
    let user = interaction.options.get('user')!.value as any;
    // User value is retrieved

    (async () => {
      try {
        console.log('Adding Results');
        const q_user = { userId: user };
        // Find the existing user
        const dbUser = await Standings.findOne(q_user);
        // Get user
        user = client.users.cache.get(`${user}`);
        // Saves user changes in cache
        if (dbUser) {
          Standings.updateOne(q_user, {
            championships: dbUser.championships + 1,
          }).catch((e: Error) => {
            console.log(`Error saving results ${e}`);
            return;
          });
          interaction.reply('New Champion Added');
          // Updates standings for said user and they get a championship
        } else {
          interaction.reply("User Doesn't Exist: Please add them to league");
          // If they are not a registered user
        }
      } catch (error) {
        console.log(`Error updating rankings: ${error}`);
      }
    })();
  },
  name: 'add-champion',
  description: 'Add superbowl championship to user',
  options: [
    {
      name: 'user',
      description: 'The superbowl champ',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
};
