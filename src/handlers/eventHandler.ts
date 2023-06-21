const path = require('path');
const getAllFiles = require('../utils/getAllFiles');

module.exports = (client: any) => {
  const eventFolders = getAllFiles(
    path.join(__dirname, '../events'),
    true
  ) as string[];
  //Goes 2 folders up enters events and lists folders inside
  for (const eventFolder of eventFolders!) {
    //Goes thru each event folder separately
    const eventFiles = getAllFiles(eventFolder) as string[];
    eventFiles.sort((a, b) => (a > b ? 1 : -1));
    //Uses getAllFiles which returns path of all files and folders inside
    //the folder to define eventFiles then sorts

    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop()!;
    //Replaces path to folder with name of last destination
    //(removes the / and everything before them )

    client.on(eventName, async (arg: any) => {
      for (const eventFile of eventFiles) {
        //For each TS file from the folder
        const eventFunction = require(eventFile);
        //Create a function that uses that requires that file as a module
        await eventFunction(client, arg);
      }
    });
  }
};

export default eventHandler;
