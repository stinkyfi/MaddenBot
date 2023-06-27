import { Client, CommandInteraction } from 'discord.js';
import { ApplicationCommandOptionType } from 'discord.js';
import Crimes from '../../models/Crimes';
import dotenv from 'dotenv';
dotenv.config();

module.exports = {
  /* @param {Client} client
   * @param {Interaction} interaction */
  callback: (_client: Client, interaction: CommandInteraction) => {
    console.log('Add Crime');
    const crime = interaction.options.get('crime')!.value as string;
    // Retrieves crime value

    (async () => {
      try {
        const crimeCount = await Crimes.find().count();
        // Crime count
        const newCrime = new Crimes({
          id: crimeCount + 1,
          title: crime,
        });
        // Increments crime count

        newCrime.save().catch((e: Error) => {
          console.log(`Error saving results ${e}`);
          return;
        });
        interaction.reply(`New Crime Added: ${crime}`);
      } catch (error) {
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
