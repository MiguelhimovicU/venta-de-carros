// modules/fileHandler.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/cars.json');

// Función para leer el archivo JSON
const readFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

// Función para escribir en el archivo JSON
const writeFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

module.exports = {
  readFile,
  writeFile
};
