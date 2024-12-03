const mongoose = require('mongoose');

// Definimos el esquema de las reseñas
const reviewSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'] // El nombre es obligatorio
    },
    age: { 
        // type: Number,
        type: String, 
        min: [1, 'La edad debe ser un número positivo'],
        max: [120, 'La edad no puede ser mayor de 120 años'],
        required: false // La edad es opcional
    },
    score: { 
        type: String, 
        // type: Number, 
        required: [true, 'El puntaje es obligatorio'], 
        min: [0, 'El puntaje debe ser entre 0 y 10'], 
        max: [10, 'El puntaje debe ser entre 0 y 10'] 
    },
    reviewtext: { 
        type: String, 
        required: false // Reseña de texto opcional 
    },
    places: { 
        type: String, 
        required: false // El lugar es opcional, sin importar si hay reseña o no
    }
});

// Creamos el modelo de Review a partir del esquema
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;