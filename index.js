// index.js
const express = require('express');
const app = express();
const carRoutes = require('./routes/cars');

app.use(express.json());  // Para parsear JSON en las peticiones

// Usar las rutas de los carros
app.use('/api', carRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
