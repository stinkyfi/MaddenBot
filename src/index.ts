import { Client, IntentsBitField } from 'discord.js';
import eventHandler from './handlers/eventHandler';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

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
    await mongoose.connect(process.env.MONGODB_URI as string, {});
    console.log('Connected to DB');
    eventHandler(client);

    client.login(process.env.TOKEN);
  }
 catch (error) {
    console.log(`Error: ${error}`);
  }
})();

// Checks for mongoDB database connection string
