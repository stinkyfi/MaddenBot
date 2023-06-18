import path from 'path';
import getAllFiles from './getAllFiles';

const getLocalCommands = (exceptions = [] as string[]) => {
  const localCommands = [] as string[];

  const commandCategories = getAllFiles(
    path.join(__dirname, '..', 'commands'),
    true
  );

  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
      const commandObject = require(commandFile) as any;

      if (exceptions.includes(commandObject.name)) {
        continue;
      }

      localCommands.push(commandObject);
    }
  }

  return localCommands;
};

export default getLocalCommands;
