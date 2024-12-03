const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const reviewRoutes = require('./routes/reviewroutes');
const userRoutes = require('./routes/userRoutes');

const dotenv = require('dotenv');

// Inicializar Express
const app = express();

// Middleware
app.use(bodyParser.json()); // Para que express entienda el cuerpo de las peticiones en formato JSON
app.use(cors());
app.use(express.json()); // Para permitir solicitudes desde otros dominios (por ejemplo, el frontend)

// Configuración de la sesión 
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecretKey',
  resave: false,
  saveUninitialized: true, 
  cookie: { secure: false }
}));

// Configurar variables de entorno
dotenv.config();
console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
  })
//   .connect('mongodb+srv://schenkschenk:schenkschenk1@voyage.m2xsl.mongodb.net/voyage?retryWrites=true&w=majority')
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((error) => console.error('Error de conexión a MongoDB:', error));

// Importar las rutas de reseñas
app.use('/api/review', reviewRoutes); // Usar las rutas de reseñas bajo el prefijo '/api/reviews'
app.use('/api/users', userRoutes);

app.get('/api/test', (req, res) => {
    res.json({ message: 'La API funciona correctamente' });
});

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 3200;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

