import dayjs from 'dayjs';
import { readLogsFile, writeLogsFile } from '../modules/fileHandler.js'; 
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const addMetaData = async (req, res, next) => {
  const currentDate = dayjs().format('HH:mm DD-MM-YYYY');
  
  // Añadir dirección IP del cliente
  req.body.ip_address = req.ip;

  // Añadir timestamps según el método de la solicitud
  if (req.method === 'POST') {
    req.body.created_at = currentDate;
  } else if (req.method === 'PUT') {
    req.body.updated_at = currentDate;
  }

  // Guardar en el archivo JSON
  const logEntry = {
    ...req.body,
    method: req.method,
    timestamp: currentDate,
  };

  try {
    const logs = await readLogsFile(); 
    logs.push(logEntry); 
    await writeLogsFile(logs); 
  } catch (error) {
    console.error('Error al escribir en el archivo de logs:', error);
  }

  next();
};