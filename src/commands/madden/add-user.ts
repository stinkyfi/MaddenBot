import { CommandInteraction, Client } from 'discord.js';

const { ApplicationCommandOptionType } = require('discord.js');
const Standings = require('../../models/Standings');

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (client: Client, interaction: CommandInteraction) => {
    console.log('Adding New User');
    if (interaction.user.id !== process.env.DEV) {
      //If user ID is not defined as having permisions
      interaction.reply('You are not allowed to call this command');
      //They are denied use of the command
      return;
    }
    let user = interaction.options.get('user')!.value as any;
    const location = interaction.options.get('location')!.value as string;
    const team = interaction.options.get('team')!.value as string;
    //Creates user variables

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
        //Sets new standings for user
        newUser.save().catch((e: Error) => {
          console.log(`Error saving results ${e}`);
          return;
        });
        user = client.users.cache.get(`${user}`);
        interaction.reply('New User Added');
        //User is saved and added
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
