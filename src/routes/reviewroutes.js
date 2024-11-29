const express = require('express');
const router = express.Router();
const Review = require('../models/review');

// Ruta para crear una nueva reseña (POST /api/reviews)
router.post('/', async (req, res) => {
    const { name, age, score, reviewText, places } = req.body;

    // Validación de datos: nombre y puntaje son obligatorios
    if (!name || !score) {
        return res.status(400).json({ message: 'El nombre y el puntaje son obligatorios' });
    }

    // Creamos la nueva reseña
    const newReview = new Review({
        name,
        age: age ? age : undefined, // Si no se pasa edad, no se incluye en la base de datos
        score,
        reviewText: reviewText ? reviewText.trim() : undefined, // Si no se proporciona reseña, no se incluirá
        places: places ? places.trim() : undefined // Si no se proporciona lugar, no se incluirá
    });

    try {
        // Guardamos la reseña en la base de datos
        const savedReview = await newReview.save();
        res.status(201).json(savedReview); // Respondemos con la reseña guardada
    } catch (err) {
        res.status(500).json({ message: 'Error al guardar la reseña', error: err.message });
    }
});

// Ruta para obtener todas las reseñas (GET /api/reviews)
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find(); // Buscar todas las reseñas
        res.json(reviews); // Devolver las reseñas en formato JSON
    } catch (err) {
        res.status(400).send(err); // Responder con error si algo falla
    }
});

// Ruta para obtener reseñas ordenadas por puntaje (GET /api/reviews/sort)
router.get('/sort', async (req, res) => {
    const { order } = req.query; // Obtener el parámetro 'order' de la consulta

    // Configurar las opciones de orden según el parámetro
    let sortOptions = {};
    if (order === 'asc') {
        sortOptions.score = 1; // Orden ascendente por puntaje
    } else if (order === 'desc') {
        sortOptions.score = -1; // Orden descendente por puntaje
    } else {
        return res.status(400).json({ message: 'Orden inválido. Usa "asc", "desc" o "random".' });
    }

    try {
        // Buscar todas las reseñas y ordenarlas según las opciones
        const reviews = await Review.find().sort(sortOptions);
        res.json(reviews); // Devolver las reseñas ordenadas
    } catch (err) {
        res.status(400).send(err); // Responder con error si algo falla
    }
});

// Ruta para obtener reseñas aleatorias (GET /api/reviews/random)
router.get('/random', async (req, res) => {
    try {
        // Obtener 5 reseñas aleatorias usando el agregador de MongoDB
        const reviews = await Review.aggregate([{ $sample: { size: 5 } }]);
        res.json(reviews); // Devolver las reseñas aleatorias
    } catch (err) {
        res.status(400).send(err); // Responder con error si algo falla
    }
});

// Ruta para obtener estadísticas de las reseñas (GET /api/reviews/stats)
router.get('/stats', async (req, res) => {
    try {
        // Obtener el número total de reseñas
        const count = await Review.countDocuments();
        
        // Obtener el puntaje promedio de las reseñas
        const avgScore = await Review.aggregate([
            { $group: { _id: null, avgScore: { $avg: "$score" } } }
        ]);
        
        // Responder con las estadísticas
        res.json({
            totalReviews: count,
            averageScore: avgScore[0] ? avgScore[0].avgScore : 0
        });
    } catch (err) {
        res.status(400).send(err); // Responder con error si algo falla
    }
});

// Ruta para editar una reseña (PUT /api/reviews/:id)
router.put('/:id', async (req, res) => {
    try {
        // Buscar la reseña por ID y actualizarla con los datos del cuerpo de la solicitud
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedReview); // Devolver la reseña actualizada
    } catch (err) {
        res.status(400).send(err); // Responder con error si algo falla
    }
});

// Ruta para eliminar una reseña (DELETE /api/reviews/:id)
router.delete('/:id', async (req, res) => {
    try {
        // Eliminar la reseña por ID
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Reseña eliminada' }); // Responder con mensaje de éxito
    } catch (err) {
        res.status(400).send(err); // Responder con error si algo falla
    }
});

module.exports = router;