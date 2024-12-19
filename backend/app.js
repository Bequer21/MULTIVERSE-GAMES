const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jugadoresRoutes = require('./routes/jugadores');
const campeonesRoutes = require('./routes/campeones'); 
const partidasRoutes = require('./routes/partidas'); 

const habilidadesRoutes = require('./routes/habilidades');
const equiposRoutes = require('./routes/equipos');
require('dotenv').config();

const fs = require('fs');
const path = require('path');

// Crear la carpeta de imágenes si no existe
const campeonesDir = path.join(__dirname, 'img/campeones');
if (!fs.existsSync(campeonesDir)) {
    fs.mkdirSync(campeonesDir, { recursive: true });
}

// Habilitar CORS
const app = express();
app.use(cors());

// Middleware para analizar JSON
app.use(bodyParser.json());

// Rutas
app.use('/jugadores', jugadoresRoutes);
app.use('/campeones', campeonesRoutes); // Agregar las rutas de Campeones
app.use('/habilidades', habilidadesRoutes);
app.use('/equipos', equiposRoutes);
app.use('/partidas', partidasRoutes);
app.use('/img', express.static('img'));

// Inicio del servidor
const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
