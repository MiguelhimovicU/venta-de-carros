import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de los archivos JSON
const carsFilePath = path.join(__dirname, '../../data/cars.json');
const logsFilePath = path.join(__dirname, '../../data/logs.json'); // Nueva ruta para logs.json

// Función para leer el archivo JSON de carros
export const readCarsFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(carsFilePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

// Función para escribir en el archivo JSON de carros
export const writeCarsFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(carsFilePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

// Función para leer el archivo JSON de logs
export const readLogsFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(logsFilePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

// Función para escribir en el archivo JSON de logs
export const writeLogsFile = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(logsFilePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};
