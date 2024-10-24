import dayjs from "dayjs"; 
import express from "express";
import { readCarsFile, writeCarsFile } from "../src/modules/fileHandler.js"; 
import { addMetaData } from "../src/middlewares/logMiddleware.js"; 

export const carsFileRouter = express.Router();

// Obtener todos los carros
// Obtener todos los carros
// Obtener todos los carros con filtrado y límite
// Obtener todos los carros con filtrado y límite
// Obtener todos los carros con filtrado y límite
carsFileRouter.get("/", async (req, res) => {
  try {
    // Cambié 'readFile' por 'readCarsFile'
    const cars = await readCarsFile();

    // Obtener parámetros de consulta
    const filterKey = req.query.key; 
    const filterValue = req.query.filter; 
    const limit = req.query.limit ? parseInt(req.query.limit) : cars.length;

    // Filtrar los carros
    let filteredCars = cars;

    if (filterKey && filterValue) {
      filteredCars = cars.filter(car => car[filterKey] && car[filterKey].toString().toLowerCase() === filterValue.toLowerCase());
    }

    // Limitar los resultados
    filteredCars = filteredCars.slice(0, limit);

    res.json(filteredCars);
  } catch (error) {
    res.status(500).send('Error al obtener los carros');
  }
});

// Obtener un carro por ID
carsFileRouter.get("/:carId", async (req, res) => {
  try {
    const cars = await readCarsFile(); 
    const car = cars.find(c => c.id === parseInt(req.params.carId));
    if (car) {
      res.json(car);
    } else {
      res.status(404).send('Carro no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al obtener el carro');
  }
});

// Crear un nuevo carro (aplicar el middleware aquí)
carsFileRouter.post("/", addMetaData, async (req, res) => {
  try {
    const cars = await readCarsFile(); 
    const newCar = {
      id: cars.length + 1,
      ...req.body
    };
    cars.push(newCar);
    await writeCarsFile(cars); 
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).send('Error al crear el carro');
  }
});

// Actualizar un carro (aplicar el middleware aquí)
carsFileRouter.put("/:carId", addMetaData, async (req, res) => {
  try {
    const cars = await readCarsFile(); 
    const index = cars.findIndex(c => c.id === parseInt(req.params.carId));
    if (index !== -1) {
      cars[index] = { ...cars[index], ...req.body };
      await writeCarsFile(cars); 
      res.json(cars[index]);
    } else {
      res.status(404).send('Carro no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al actualizar el carro');
  }
});

// Eliminar un carro
carsFileRouter.delete("/:carId", async (req, res) => {
  try {
    const cars = await readCarsFile(); 
    const updatedCars = cars.filter(c => c.id !== parseInt(req.params.carId));
    if (cars.length === updatedCars.length) {
      return res.status(404).send('Carro no encontrado');
    }
    await writeCarsFile(updatedCars); 
    res.status(200).send('Carro eliminado');
  } catch (error) {
    res.status(500).send('Error al eliminar el carro');
  }
});

carsFileRouter.put("/update-all", async (req, res) => {
  console.log('Endpoint update-all reached'); 

  const { field, value } = req.body; 
  const currentDate = dayjs().format('HH:mm DD-MM-YYYY');

  try {
    const cars = await readCarsFile(); 

    // Actualiza el campo especificado en todos los registros
    const updatedCars = cars.map(car => {
      if (field in car) {
        return {
          ...car,
          [field]: value,
          updated_at: currentDate 
        };
      }
      return car;
    });

    await writeCarsFile(updatedCars); 
    res.json(updatedCars); 
  } catch (error) {
    console.error('Error al actualizar los registros:', error);
    res.status(500).send('Error al actualizar los registros');
  }
});