const { ApplicationCommandOptionType } = require('discord.js');
const Standings = require('../../models/Standings');

module.exports = {
    name: 'add-user',
    description: 'Add User to standings',
    options: [
        {
            name: 'user',
            description: 'The user to add results for',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        },
    ],
    callback: (client, interaction) => {
      console.log("Adding New User");
      let user = interaction.options.get('user').value;

      (async () => {
      try {
          newUser = new Standings({
            userId: user,
            wins: 0,
            loss: 0,
            draw: 0
          });
          newUser.save().catch((e) => {
            console.log(`Error saving results ${e}`);
            return;
          });

        user = client.users.cache.get(`${user}`)
        interaction.reply(`New User Added: ${user}`);
      } catch (error) {
        console.log(`Error updating rankings: ${error}`);
      }
    })();
  }
}