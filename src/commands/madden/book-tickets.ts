import { Client, CommandInteraction } from 'discord.js';

require('dotenv').config();
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Standings = require('../../models/Standings');

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (client: Client, interaction: CommandInteraction) => {
    let user = interaction.options.get('user')!.value as any;
    // Retrieves user value
    const location = interaction.options.get('location')!.value as string;
    // Retrieves user location ( the one that was introduced when user was
    // registered in the bot db )

    (async () => {
      try {
        console.log('Booking Vacation');
        const d = new Date();
        // Creates date
        const q_user = { userId: user };
        // Find the existing user
        const dbUser = (await Standings.findOne(q_user))!;
        // Get users from database
        user = client.users.cache.get(`${user}`);
        // Saves user changes in cache
        const embed = new EmbedBuilder()
          .setTitle(`:airplane: Flight to ${location} Booked`)
          .setThumbnail('https://i.ibb.co/sHp0hSn/Air-update-Dolphins.jpg')
          .setColor(0xff0000)
          .addFields(
            {
              name: `${getRank(dbUser.championships)} ${user.username}`,
              value: `${dbUser.location} ${dbUser.team} Roster`,
            },
            {
              name: ':airplane_departure: Departure',
              value: d.toLocaleString(),
            }
          );
        // Creates embed message for booked flight
        await interaction.reply({ embeds: [embed] });
        //  And sends it in chat
      } catch (error) {
        console.log(`Error updating rankings: ${error}`);
      }
    })();
  },
  name: 'book-tickets',
  description: 'Book vaction tickets for team out of playoffs',
  options: [
    {
      name: 'user',
      description: 'The user to book for.',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'location',
      description: 'Where is the team going to vacation?',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
};

function getRank(chips: number) {
  if (chips == 1) {
    return process.env.EMOJI_STAR;
  } else if (chips == 2) {
    return process.env.EMOJI_SUPERSTAR;
  } else if (chips > 2) {
    return process.env.EMOJI_XFACTOR;
  } else {
    return process.env.EMOJI_NORMAL;
  }
}
