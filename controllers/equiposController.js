const pool = require('../config/db');

// Obtener todos los equipos
exports.getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM equipos');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Error al obtener los equipos.');
    }
};

// Obtener un equipo por ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM equipos WHERE id_equipo = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send('Error al obtener el equipo.');
    }
};

// Crear un nuevo equipo
exports.create = async (req, res) => {
    try {
        const {
            nombre,
            victorias,
            jugador_1,
            jugador_2,
            jugador_3,
            jugador_4,
            jugador_5,
            campeon_1,
            campeon_2,
            campeon_3,
            campeon_4,
            campeon_5
        } = req.body;

        const result = await pool.query(
            `INSERT INTO equipos (
                nombre, victorias, jugador_1, jugador_2, jugador_3, jugador_4, jugador_5, 
                campeon_1, campeon_2, campeon_3, campeon_4, campeon_5
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
            [nombre, victorias, jugador_1, jugador_2, jugador_3, jugador_4, jugador_5, campeon_1, campeon_2, campeon_3, campeon_4, campeon_5]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).send('Error al crear el equipo.');
    }
};

// Actualizar un equipo
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nombre,
            victorias,
            jugador_1,
            jugador_2,
            jugador_3,
            jugador_4,
            jugador_5,
            campeon_1,
            campeon_2,
            campeon_3,
            campeon_4,
            campeon_5
        } = req.body;

        const result = await pool.query(
            `UPDATE equipos SET 
                nombre = $1, victorias = $2, 
                jugador_1 = $3, jugador_2 = $4, jugador_3 = $5, jugador_4 = $6, jugador_5 = $7, 
                campeon_1 = $8, campeon_2 = $9, campeon_3 = $10, campeon_4 = $11, campeon_5 = $12
            WHERE id_equipo = $13 RETURNING *`,
            [nombre, victorias, jugador_1, jugador_2, jugador_3, jugador_4, jugador_5, campeon_1, campeon_2, campeon_3, campeon_4, campeon_5, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Equipo no encontrado.' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send('Error al actualizar el equipo.');
    }
};

// Eliminar un equipo
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM equipos WHERE id_equipo = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Equipo no encontrado.' });
        }

        res.json({ message: 'Equipo eliminado correctamente.' });
    } catch (error) {
        res.status(500).send('Error al eliminar el equipo.');
    }
};
