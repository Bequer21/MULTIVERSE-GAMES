const pool = require('../config/db');

exports.getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM partidas');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM partidas WHERE id_partida = $1', [id]);
        if (result.rows.length === 0) return res.status(404).send('Partida no encontrada');
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.create = async (req, res) => {
    const { nombre, estado, equipo_1, equipo_2} = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO jugadores (nombre, estado, equipo_1, equipo_2) VALUES ($1, $2, $3, $4) RETURNING *',
            [nombre, estado, equipo_1, equipo_2]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { nombre, fecha_inicio, fecha_fin, estado, equipo_1, equipo_2, ganador } = req.body;
    try {
        const result = await pool.query(
            'UPDATE partidas SET nombre = $1, fecha_inicio = $2, fecha_fin = $3, estado = $4, equipo_1 = $5, equipo_2 = $6, ganador = $7 WHERE id_partida = $8 RETURNING *',
            [nombre, fecha_inicio, fecha_fin, estado, equipo_1, equipo_2, ganador, id]
        );
        if (result.rows.length === 0) return res.status(404).send('Partida no encontrada');
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.remove = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM partidas WHERE id_partida = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).send('Partida no encontrada');
        res.json({ message: 'Partida eliminada' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
