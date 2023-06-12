require('dotenv').config();
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Standings = require('../../models/Standings');
const Suspensions = require('../../models/Supensions');

module.exports = {
   /* @param {Client} client
    * @param {Interaction} interaction */
    callback: (client, interaction) => {
      console.log('Supending User');
      if (interaction.user.id !== process.env.DEV) {
        interaction.reply('You are not allowed to call this command');
        return;
      }
      let user = interaction.options.get('user').value;
      const suspended = interaction.options.get('days').value;

      (async () => {
      try {
        const d = new Date();
        // Users Queries
        const q_user = { userId: user };
        // Find the existing user
        const dbUser = await Standings.findOne(q_user);
        
        const newSuspension = new Suspensions({
            userId: user,
            days: suspended,
            date: d,
          });

          newSuspension.save().catch((e) => {
            console.log(`Error saving results ${e}`);
            return;
        });

        // Get users
        user = client.users.cache.get(`${user}`);
        const embed = new EmbedBuilder()
        .setTitle(`${getRank(dbUser.championships)} ${user.username} has been Suspended`)
        .setThumbnail('https://i.ibb.co/jhJbVVF/roger-goodell-e1465335430150.webp')
        .setColor(0xFF0000)
        .addFields(
          {
            name: `Length:`,
            value: `${suspended} Days`,
          },
        );
        await interaction.reply({ embeds: [embed] });
      }
      catch (error) {
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

function getRank(chips) {
  if (chips == 1) { return process.env.EMOJI_STAR; }
  else if (chips == 2) { return process.env.EMOJI_SUPERSTAR; }
  else if (chips > 2) { return process.env.EMOJI_XFACTOR; }
  else { return process.env.EMOJI_NORMAL; }
}