const { } = require('discord.js');
const Standings = require('../../models/Standings');

module.exports = {
    name: 'get-standings',
    description: 'Get the User vs. User Standings',
    options: [],

    callback: (client, interaction) => {
      console.log("Get Standings");

      (async () => {
      try {
        const standings = await Standings.find().sort({wins: -1, draw: -1, loss: 1});
        let i = 1;
        let str = ":football: **Madden User Rankings** :football:\n";
        for (const s of standings) {
            user = await client.users.fetch(s.userId);
            chips = s.championships;
            console.log(chips)
            if(chips == 1) {rank = ':star~1:'}
            else if(chips == 2) {rank = ':superstar:'}
            else if (chips > 2) {rank = ':xfactor:'}
            else {rank = ':normal:'}
            str += `${i}. ${rank} ${user.username} (${s.wins}-${s.loss}-${s.draw}) \n`;
            i++;
        }
        interaction.reply(str);

      } catch (error) {
        console.log(`Error getting rankings: ${error}`);
      }
    })();
  }
}