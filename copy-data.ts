const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, 'src', 'data');
const destinationDir = path.join(__dirname, 'dist', 'data');

fs.copySync(sourceDir, destinationDir);
