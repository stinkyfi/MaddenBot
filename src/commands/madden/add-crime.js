require('dotenv').config();
const { ApplicationCommandOptionType } = require('discord.js');
const Crimes = require('../../models/Crimes');

module.exports = {
   /* @param {Client} client
    * @param {Interaction} interaction */
    callback: (client, interaction) => {
    console.log('Add Crime');
    const crime = interaction.options.get('crime').value;

      (async () => {
      try {
        const crimeCount = await Crimes.find().count();
        const newCrime = new Crimes({
            id: crimeCount+1,
            title: crime,
          });

          newCrime.save().catch((e) => {
            console.log(`Error saving results ${e}`);
            return;
          });
        interaction.reply(`New Crime Added: ${crime}`);
      }
      catch (error) {
        console.log(`Error suspending player: ${error}`);
      }
    })();
  },
  name: 'add-crime',
  description: 'Add a new crime',
  options: [
      {
          name: 'crime',
          description: 'New crime title',
          required: true,
          type: ApplicationCommandOptionType.String,
      },
  ],
};