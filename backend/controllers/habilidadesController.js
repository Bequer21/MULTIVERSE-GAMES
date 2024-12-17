const pool = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        // Obtener todas las habilidades
        const result = await pool.query('SELECT * FROM habilidades');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        // Obtener una habilidad por su ID
        const result = await pool.query('SELECT * FROM habilidades WHERE id_habilidad = $1', [id]);
        if (result.rows.length === 0) return res.status(404).send('Habilidad no encontrada');
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.create = async (req, res) => {
    const { nombre, fuerza, descripcion, tiempo_enfriamiento, consumo_mana } = req.body;
    try {
        // Crear una nueva habilidad
        const result = await pool.query(
            'INSERT INTO habilidades (nombre, fuerza, descripcion, tiempo_enfriamiento, consumo_mana) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, fuerza, descripcion, tiempo_enfriamiento, consumo_mana]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { nombre, fuerza, descripcion, tiempo_enfriamiento, consumo_mana } = req.body;
    try {
        // Actualizar una habilidad existente
        const result = await pool.query(
            'UPDATE habilidades SET nombre = $1, fuerza = $2, descripcion = $3, tiempo_enfriamiento = $4, consumo_mana = $5 WHERE id_habilidad = $6 RETURNING *',
            [nombre, fuerza, descripcion, tiempo_enfriamiento, consumo_mana, id]
        );
        if (result.rows.length === 0) return res.status(404).send('Habilidad no encontrada');
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    try {
        // Eliminar una habilidad por su ID
        const result = await pool.query('DELETE FROM habilidades WHERE id_habilidad = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).send('Habilidad no encontrada');
        res.json({ message: 'Habilidad eliminada' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
