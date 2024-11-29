const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Configurar variables de entorno
dotenv.config();

// Inicializar Express
const app = express();

// Middleware
app.use(bodyParser.json()); // Para que express entienda el cuerpo de las peticiones en formato JSON
app.use(cors()); // Para permitir solicitudes desde otros dominios (por ejemplo, el frontend)

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, (err) => {
    if (err) {
        console.log('Error de conexión a MongoDB:', err);
    } else {
        console.log('Conectado a MongoDB');
    }
});

// Importar las rutas de reseñas
const reviewRoutes = require('./routes/reviewroutes');
app.use('/api/reviews', reviewRoutes); // Usar las rutas de reseñas bajo el prefijo '/api/reviews'

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});