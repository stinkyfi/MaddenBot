const fs = require('fs');
const path = require('path');

module.exports = (directory: any, foldersOnly = false) => {
  const fileNames = [];

  const files = fs.readdirSync(directory, { withFileTypes: true });
  //Reads directory and populates it with names of files and directories inside it

  for (const file of files) {
    const filePath = path.join(directory, file.name);
    //Creates path for files

    if ((foldersOnly && file.isDirectory()) || (foldersOnly && file.isFile())) {
      fileNames.push(filePath);
      //Populates filenames array with paths to files
    }
  }
  return fileNames;
};
