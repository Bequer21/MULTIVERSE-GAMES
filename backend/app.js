const express = require('express');
const bodyParser = require('body-parser');
const jugadoresRoutes = require('./routes/jugadores');  // Verifica que esta ruta sea correcta
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Rutas
app.use('/jugadores', jugadoresRoutes);  // Esto debe dirigir correctamente a jugadores.js

// Inicio del servidor
const PORT = process.env.BACKEND_PORT || 5000;  // Usar BACKEND_PORT
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
