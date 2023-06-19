import 'dotenv/config';
import { Client, IntentsBitField } from 'discord.js';
import mongoose from 'mongoose';
import eventHandler from './handlers/eventHandler';

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('Connected to DB');
    eventHandler(client);

    client.login(process.env.TOKEN);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
})();
