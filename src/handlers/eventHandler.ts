import { Client } from 'discord.js';
import path from 'path';
const allFiles = require('../utils/getAllFiles');

module.exports = (client: Client) => {
  const eventFolders = allFiles(
    path.join(__dirname, '../events'),
    true
  ) as string[];
  //Goes 2 folders up enters events and lists folders inside
  for (const eventFolder of eventFolders!) {
    //Goes thru each event folder separately
    const eventFiles = allFiles(eventFolder) as string[];
    eventFiles.sort((a, b) => (a > b ? 1 : -1));
    //Uses allFiles which returns path of all files and folders inside
    //the folder to define eventFiles then sorts

    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop()!;
    //Replaces path to folder with name of last destination
    //(removes the / and everything before them )

    client.on(eventName, async (arg: any) => {
      for (const eventFile of eventFiles) {
        //For each file from the folder
        const eventFunction = require(eventFile);
        //Creates functions with name of the files present
        await eventFunction(client, arg);
      }
    });
  }
};
