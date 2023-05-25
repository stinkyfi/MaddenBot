const { ApplicationCommandOptionType } = require('discord.js');
const Standings = require('../../models/Standings');

module.exports = {
<<<<<<< HEAD
    /* @param {Client} client
     * @param {Interaction} interaction */
    callback: (client, interaction) => {
      if (interaction.user.id !== process.env.DEV) {
        interaction.reply('You are not allowed to call this command');
=======
    name: 'add-champion',
    description: 'Add superbowl championship to user',
    options: [
        {
            name: 'user',
            description: 'The superbowl champ',
            required: true,
            type: ApplicationCommandOptionType.Mentionable,
        }
    ],
    callback: (client, interaction) => {
      if(interaction.user.id !== process.env.DEV)
      {
        interaction.reply(`You are not allowed to call this command`);
>>>>>>> 662453c (Adding champion, permission locking on commands, media/emojis, and other enhancements)
        return;
      }
      let user = interaction.options.get('user').value;

      (async () => {
      try {
<<<<<<< HEAD
        console.log('Adding Results');
        // Users Queries
        const q_user = { userId: user };
        // Find the existing user
        const dbUser = await Standings.findOne(q_user);
        // Get users
        user = client.users.cache.get(`${user}`);

        if (dbUser) {
            Standings.updateOne(q_user, { championships: dbUser.championships + 1 }).catch((e) => {
                console.log(`Error saving results ${e}`);
                return;
              });
              interaction.reply('New Champion Added');
        }
        else {
            interaction.reply('User Doesn\'t Exist: Please add them to league');
        }
      }
      catch (error) {
        console.log(`Error updating rankings: ${error}`);
      }
    })();
  },
  name: 'add-champion',
  description: 'Add superbowl championship to user',
  options: [
      {
          name: 'user',
          description: 'The superbowl champ',
          required: true,
          type: ApplicationCommandOptionType.Mentionable,
      },
  ],
};
=======
        console.log("Adding Results");
        // Users Queries
        let q_user = {userId: user};
        // Find the existing user
        let dbUser = await Standings.findOne(q_user);
        // Get users
        user = client.users.cache.get(`${user}`)
        
        if(dbUser) {
            Standings.updateOne(q_user, { championships: dbUser.championships + 1 }).catch((e) => {
                console.log(`Error saving results ${e}`);
                return;
              })
              interaction.reply(`New Champion Added`);
        } else {
            interaction.reply(`User Doesn't Exist: Please add them to league`);
        }
      } catch (error) {
        console.log(`Error updating rankings: ${error}`);
      }
    })();
  }
}
>>>>>>> 662453c (Adding champion, permission locking on commands, media/emojis, and other enhancements)
