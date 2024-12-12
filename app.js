const express = require('express');
const bodyParser = require('body-parser');
const jugadoresRoutes = require('./routes/jugadores');
require('dotenv').config();
const cors = require('cors');

// Habilitar CORS

const app = express();
app.use(cors());

app.use(bodyParser.json());

// Rutas
app.use('/jugadores', jugadoresRoutes);

// Inicio del servidor
const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
