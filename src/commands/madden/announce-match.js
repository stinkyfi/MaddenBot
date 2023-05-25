require('dotenv').config();
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Standings = require('../../models/Standings');

module.exports = {
   /* @param {Client} client
    * @param {Interaction} interaction */
    callback: (client, interaction) => {
      let user1 = interaction.options.get('user1').value;
      let user2 = interaction.options.get('user2').value;

      (async () => {
      try {
        console.log('Announcing Match');
        // Users Queries
        const q_user1 = { userId: user1 };
        const q_user2 = { userId: user2 };
        // Find the existing user
        const dbUser1 = await Standings.findOne(q_user1);
        const dbUser2 = await Standings.findOne(q_user2);
        // Get users
        user1 = client.users.cache.get(`${user1}`);
        user2 = client.users.cache.get(`${user2}`);
        const record1 = `(${dbUser1.wins}-${dbUser1.loss}-${dbUser1.draw})`;
        const record2 = `(${dbUser2.wins}-${dbUser2.loss}-${dbUser2.draw})`;

        const embed = new EmbedBuilder()
        .setTitle('It\'s Game Time!')
        .setThumbnail('https://i.ibb.co/0mg2Zf0/madden-1.png')
        .setColor(0xff0000)
        .addFields(
          {
            name: `${getRank(dbUser1.championships)} ${user1.username}`,
            value: record1,
            inline: true,
          },
          {
            name: `${getRank(dbUser2.championships)} ${user2.username}`,
            value: record2,
            inline: true,
          },
          {
            name: ' ',
            value: 'User Match is Starting!',
          },
        );
        await interaction.reply({ embeds: [embed] });
      }
      catch (error) {
        console.log(`Error updating rankings: ${error}`);
      }
    })();
  },
  name: 'announce-match',
  description: 'Announce a User game is starting',
  options: [
      {
          name: 'user1',
          description: 'The first user',
          required: true,
          type: ApplicationCommandOptionType.Mentionable,
      },
      {
          name: 'user2',
          description: 'The second user',
          required: true,
          type: ApplicationCommandOptionType.Mentionable,
      },
  ],
};

function getRank(chips) {
  if (chips == 1) { return process.env.EMOJI_STAR; }
  else if (chips == 2) { return process.env.EMOJI_SUPERSTAR; }
  else if (chips > 2) { return process.env.EMOJI_XFACTOR; }
  else { return process.env.EMOJI_NORMAL; }
}