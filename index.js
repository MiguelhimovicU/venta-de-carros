import express from 'express';
import { routerCars } from './routes/cars.js'; 

const app = express();

app.use(express.json()); 

// Invocar las rutas de carros
routerCars(app); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
