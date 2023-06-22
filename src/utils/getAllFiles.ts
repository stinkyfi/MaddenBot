const fs = require('fs');
import path from 'path';

module.exports = (directory: string, foldersOnly = false) => {
  const fileNames = [] as string[];

  const files = fs.readdirSync(directory, { withFileTypes: true });
  //Reads directory and populates it with names of files and directories inside it

  for (const file of files) {
    const filePath = path.join(directory, file.name);
    //Creates path for files

    if (foldersOnly) {
      if (file.isDirectory() || file.isFile()) {
        fileNames.push(filePath);
      }
    }
    //Populates filenNames array with paths
  }
  return fileNames;
};
