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
            chips = dbUser.championships;
            console.log(dbUser.championships)
            if(chips == 0) {rank = ':normal:'}
            if(chips == 1) {rank = ':star~1:'}
            if(chips == 2) {rank = ':superstar:'}
            if(chips > 2) {rank = ':xfactor:'}
            const embed = new EmbedBuilder()
            .setTitle(`${rank} ${user.username}`)
            .setDescription('User vs. User Record')
            .setThumbnail(user.displayAvatarURL())
            .setColor(0x0099FF)
            .addFields(
              {
                name: 'Wins-Loss-Draw',
                value: record,
              },
              {
                name: 'Championships',
                value: `${dbUser.championships}`,
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