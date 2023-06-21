import 'dotenv/config';
import {
  ApplicationCommandOptionType,
  Client,
  EmbedBuilder,
  Interaction,
} from 'discord.js';
import Standings from '../../models/Standings';

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (client: Client | any, interaction: Interaction | any) => {
    console.log('Get User');
    let user = interaction.options.get('user').value;

    (async () => {
      try {
        const q_user = { userId: user };
        const dbUser = await Standings.findOne(q_user)!;

        if (dbUser) {
          user = await client.users.fetch(dbUser.userId);
          const record = `(${dbUser.wins}-${dbUser.loss}-${dbUser.draw})`;
          const embed = new EmbedBuilder()
            .setTitle(`${getRank(dbUser.championships)} ${user.username}`)
            .setDescription(`${dbUser.location} ${dbUser.team}`)
            .setThumbnail(user.displayAvatarURL())
            .setColor(getColor(dbUser.team))
            .addFields({
              name: 'Wins-Loss-Draw',
              value: record,
            });
          await interaction.reply({ embeds: [embed] });
        } else {
          interaction.reply('User not in league, please add them');
        }
      } catch (error) {
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
  } else if (chips == 2) {
    return process.env.EMOJI_SUPERSTAR;
  } else if (chips > 2) {
    return process.env.EMOJI_XFACTOR;
  }
  return process.env.EMOJI_NORMAL;
}

function getColor(teamName: string) {
  if (teamName === 'Bengals') {
    return 0xfb4f14;
  } else if (teamName === 'Browns') {
    return 0xff3c00;
  } else if (teamName === 'Bulls') {
    return 0x000e7a;
  } else if (teamName === 'Crusaders') {
    return 0xf5f50f;
  } else if (teamName === 'Elks') {
    return 0x2d5feb;
  } else if (teamName === 'Huskies') {
    return 0x2d9feb;
  }
  return 0x000000;
}
