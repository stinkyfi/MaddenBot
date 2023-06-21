const fs = require('fs');
import path from 'path';
//Cannot redeclare path
module.exports = (directory: any, foldersOnly = false) => {
  const fileNames = [];

  const files = fs.readdirSync(directory, { withFileTypes: true });
  //Reads directory and populates it with names of files and directories inside it

  for (const file of files) {
    const filePath = path.join(directory, file.name);
    //Creates path for files

    if (foldersOnly) {
      if (file.isDirectory()) {
        fileNames.push(filePath);
      }
    } else {
      if (file.isFile()) {
        fileNames.push(filePath);
      }
    }
  }
  return fileNames;
};
