const fs = require('fs');
const path = require('path');

let count = 0;

function renameFiles(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
            renameFiles(filePath);
        } else if (file.startsWith('pnp_')) {
            const newName = `ev_${file.slice(4)}`;
            const newFilePath = path.join(directory, newName);
            fs.renameSync(filePath, newFilePath);
            console.log(`Renamed ${filePath} to ${newFilePath}`);
            count++;
        }
    }

    console.log(`Renamed ${count} files.`);
}

const startingDirectory = './'; // Change this to the root folder where you want to start the renaming process.
renameFiles(startingDirectory);