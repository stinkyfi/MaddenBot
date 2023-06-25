import path from 'path';
const getAllFiles = require('./getAllFiles');

module.exports = (exceptions = [] as string[]) => {
  const localCommands = [];

  const commandCategories = getAllFiles(
    path.join(__dirname, '../commands'),
    true
  ) as string[];
  // Imports paths of files inside commands

  for (const commandCategory of commandCategories) {
    // For each directory (in this case), inside commands
    const commandFiles = getAllFiles(commandCategory) as string[];
    // Get all files inside the specified folder
    for (const commandFile of commandFiles) {
      const commandObject = require(commandFile);
      // And for each file inside that specified folder
      if (exceptions.includes(commandObject.name)) {
        continue;
        // Cross references to see if the exceptions argument passed shares
        // name with an already existing command, if it does the nothing is done
      }
      localCommands.push(commandObject);
      // Else they are added to localCommands
    }
  }

  return localCommands;
};
