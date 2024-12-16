const pool = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM jugadores');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM jugadores WHERE id_jugador = $1', [id]);
        if (result.rows.length === 0) return res.status(404).send('jugador no encontrado');
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.create = async (req, res) => {
    const { nombre, contrasena, email, nivel, estado, pais, servidor } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO jugadores (nombre, contrasena, email, fecha_creacion, nivel, estado, pais, servidor) VALUES ($1, $2, $3, NOW(), $4, $5, $6, $7) RETURNING *',
            [nombre, contrasena, email, nivel, estado, pais, servidor]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { nombre, contrasena, email, nivel, estado, pais, servidor } = req.body;
    try {
        const result = await pool.query(
            'UPDATE jugadores SET nombre = $1, contrasena = $2, email = $3, nivel = $4, estado = $5, pais = $6, servidor = $7 WHERE id_jugador = $8 RETURNING *',
            [nombre, contrasena, email, nivel, estado, pais, servidor, id]
        );
        if (result.rows.length === 0) return res.status(404).send('jugadores no encontrado');
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM jugadores WHERE id_jugador = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).send('jugador no encontrado');
        res.json({ message: 'jugador eliminado' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
