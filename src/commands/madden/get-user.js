const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const Standings = require('../../models/Standings');

module.exports = {
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
    callback: (client, interaction) => {
      console.log("Get User");
      let user = interaction.options.get('user').value;
      
      (async () => {
      try {
        let q_user = {userId: user};
        let dbUser = await Standings.findOne(q_user);

        if (dbUser) {
            user = await client.users.fetch(dbUser.userId);
            record = `(${dbUser.wins}-${dbUser.loss}-${dbUser.draw})`;
            const embed = new EmbedBuilder()
            .setTitle(`${user.username}`)
            .setDescription('User vs. User Record')
            .setImage(user.displayAvatarURL())
            .setColor(0x0099FF)
            .addFields(
              {
                name: 'Wins-Loss-Draw',
                value: record,
                inline: true,
              }
            );
            await interaction.reply({ embeds: [embed] });
        } else {
            interaction.reply(`User not in league, please add them`);
        }
      } catch (error) {
        console.log(`Error Displaying User: ${error}`);
      }
    })();
  }
}