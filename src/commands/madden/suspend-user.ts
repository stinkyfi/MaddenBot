import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import { Client, CommandInteraction } from 'discord.js';
import Suspensions from '../../models/Suspensions';
import Standings from '../../models/Standings';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (client: Client, interaction: CommandInteraction) => {
    console.log('Supending User');
    if (interaction.user.id !== process.env.DEV) {
      interaction.reply('You are not allowed to call this command');
      return;
    }
    // If user doesn't have permissions they cannot call the command
    let user = interaction.options.get('user')!.value as any;
    const suspended = interaction.options.get('days')!.value as string;

    (async () => {
      try {
        const d = new Date();
        // Creates new date
        const q_user = { userId: user };
        // Creates pseudo user
        const dbUser = await Standings.findOne(q_user);
        // Checks for registered user

        const newSuspension = new Suspensions({
          userId: user,
          days: suspended,
          date: d,
        });

        // Schema for new suspension

        newSuspension.save().catch((e: Error) => {
          console.log(`Error saving results ${e}`);
          return;
        });

        user = client.users.cache.get(`${user}`);

        // Saves user suspension to cache

        const embed = new EmbedBuilder()
          .setTitle(
            `${getRank(dbUser!.championships)} ${
              user.username
            } has been Suspended`
          )
          .setThumbnail(
            'https://i.ibb.co/jhJbVVF/roger-goodell-e1465335430150.webp'
          )
          .setColor(0xff0000)
          .addFields({
            name: 'Length:',
            value: `${suspended} Days`,
          });
        // Suspension embed message
        await interaction.reply({ embeds: [embed] });
      } catch (error) {
        console.log(`Error suspending player: ${error}`);
      }
    })();
  },
  name: 'suspend-user',
  description: 'Suspend user from play',
  options: [
    {
      name: 'user',
      description: 'The user being suspended',
      required: true,
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: 'days',
      description: 'Number of days supsended',
      required: true,
      type: ApplicationCommandOptionType.Integer,
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
