import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { Client, CommandInteraction } from 'discord.js';
import Standings from '../../models/Standings';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (client: Client, interaction: CommandInteraction) => {
    console.log('Get User');
    let user = interaction.options.get('user')!.value as any;
    // Retrieves user value from command ran

    (async () => {
      try {
        const q_user = { userId: user };
        // Pseudo user to not alter original value
        const dbUser = await Standings.findOne(q_user)!;
        // Looks in standings for first pseudo user that matches

        if (dbUser) {
          user = await client.users.fetch(dbUser.userId);
          // If dbuser exists in standings fetches its ID and associates it
          // to whom ran the command
          const record = `(${dbUser.wins}-${dbUser.loss}-${dbUser.draw})`;
          // Users statistics
          const embed = new EmbedBuilder()
            .setTitle(`${getRank(dbUser.championships)} ${user.username}`)
            .setDescription(`${dbUser.location} ${dbUser.team}`)
            .setThumbnail(user.displayAvatarURL())
            .setColor(getColor(dbUser.team))
            .addFields({
              name: 'Wins-Loss-Draw',
              value: record,
            });
          // Creates an embed profile for the getUser command
          await interaction.reply({ embeds: [embed] });
          // If they are a registered user it returns the embed profile
        }
 else {
          interaction.reply('User not in league, please add them');
        }
      }
 catch (error) {
        console.log(`Error Displaying User: ${error}`);
      }
    })();
  },
  name: 'get-user',
  description: 'Get user standings',
  options: [
    {
      name: 'user',
      description: 'The user to display',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
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
  return process.env.EMOJI_NORMAL;
}
// Rank system with icons to showcase rank based on victories

function getColor(teamName: string) {
  if (teamName === 'Bengals') {
    return 0xfb4f14;
  }
 else if (teamName === 'Browns') {
    return 0xff3c00;
  }
 else if (teamName === 'Bulls') {
    return 0x000e7a;
  }
 else if (teamName === 'Crusaders') {
    return 0xf5f50f;
  }
 else if (teamName === 'Elks') {
    return 0x2d5feb;
  }
 else if (teamName === 'Huskies') {
    return 0x2d9feb;
  }
  return 0x000000;
}
// Custom colors for team names unless name doesn't match in which case
// it defaults to black
