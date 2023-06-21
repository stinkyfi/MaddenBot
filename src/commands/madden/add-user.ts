import { Interaction, Client } from 'discord.js';

const { ApplicationCommandOptionType } = require('discord.js');
const Standings = require('../../models/Standings');

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (client: Client | any, interaction: Interaction | any) => {
    console.log('Adding New User');
    if (interaction.user.id !== process.env.DEV) {
      interaction.reply('You are not allowed to call this command');
      return;
    }
    let user = interaction.options.get('user').value;
    const location = interaction.options.get('location').value;
    const team = interaction.options.get('team').value;

    (async () => {
      try {
        const newUser = new Standings({
          userId: user,
          wins: 0,
          loss: 0,
          draw: 0,
          location: location,
          team: team,
        });

        newUser.save().catch((e: Error) => {
          console.log(`Error saving results ${e}`);
          return;
        });
        user = client.users.cache.get(`${user}`);
        interaction.reply('New User Added');
      } catch (error) {
        console.log(`Error updating rankings: ${error}`);
      }
    })();
  },
  name: 'add-user',
  description: 'Add User to standings',
  options: [
    {
      name: 'user',
      description: 'The user to add results for',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'location',
      description: 'The User teams location.',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: 'team',
      description: 'The User teams name',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
};
