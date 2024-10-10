// routes/cars.js
const express = require('express');
const router = express.Router();
const { readFile, writeFile } = require('../modules/fileHandler');

// Obtener todos los carros
router.get('/cars', async (req, res) => {
  try {
    const cars = await readFile();
    res.json(cars);
  } catch (error) {
    res.status(500).send('Error al obtener los carros');
  }
});

// Obtener un carro por ID
router.get('/cars/:carId', async (req, res) => {
  try {
    const cars = await readFile();
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

// Crear un nuevo carro
router.post('/cars', async (req, res) => {
  try {
    const cars = await readFile();
    const newCar = {
      id: cars.length + 1,
      ...req.body
    };
    cars.push(newCar);
    await writeFile(cars);
    res.status(201).json(newCar);
  } catch (error) {
    res.status(500).send('Error al crear el carro');
  }
});

// Actualizar un carro
router.put('/cars/:carId', async (req, res) => {
  try {
    const cars = await readFile();
    const index = cars.findIndex(c => c.id === parseInt(req.params.carId));
    if (index !== -1) {
      cars[index] = { ...cars[index], ...req.body };
      await writeFile(cars);
      res.json(cars[index]);
    } else {
      res.status(404).send('Carro no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al actualizar el carro');
  }
});

// Eliminar un carro
router.delete('/cars/:carId', async (req, res) => {
  try {
    const cars = await readFile();
    const updatedCars = cars.filter(c => c.id !== parseInt(req.params.carId));
    if (cars.length === updatedCars.length) {
      return res.status(404).send('Carro no encontrado');
    }
    await writeFile(updatedCars);
    res.status(200).send('Carro eliminado');
  } catch (error) {
    res.status(500).send('Error al eliminar el carro');
  }
});

module.exports = router;
