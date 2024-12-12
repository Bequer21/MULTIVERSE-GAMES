const pool = require('../config/db');

// Obtener todos los equipos con detalles de jugadores y campeones
exports.getAll = async (req, res) => {
    try {
        const equiposQuery = `
            SELECT 
                e.id_equipo, e.nombre, e.victorias,
                e.jugador_1, e.jugador_2, e.jugador_3, e.jugador_4, e.jugador_5,
                e.campeon_1, e.campeon_2, e.campeon_3, e.campeon_4, e.campeon_5
            FROM equipos e;
        `;
        const equiposResult = await pool.query(equiposQuery);

        const equipos = await Promise.all(equiposResult.rows.map(async (equipo) => {
            const jugadores = await Promise.all(
                [equipo.jugador_1, equipo.jugador_2, equipo.jugador_3, equipo.jugador_4, equipo.jugador_5].map(async (jugadorId) => {
                    const jugadorResult = await pool.query('SELECT * FROM jugadores WHERE id_jugador = $1', [jugadorId]);
                    return jugadorResult.rows[0];
                })
            );

            const campeones = await Promise.all(
                [equipo.campeon_1, equipo.campeon_2, equipo.campeon_3, equipo.campeon_4, equipo.campeon_5].map(async (campeonId) => {
                    const campeonResult = await pool.query('SELECT * FROM campeones WHERE id_campeon = $1', [campeonId]);
                    return campeonResult.rows[0];
                })
            );

            return {
                id_equipo: equipo.id_equipo,
                nombre: equipo.nombre,
                victorias: equipo.victorias,
                jugadores,
                campeones
            };
        }));

        res.json(equipos);
    } catch (error) {
        console.error('Error al obtener equipos:', error);
        res.status(500).json({ error: 'Error al obtener equipos' });
    }
};

// Obtener un equipo por ID con detalles de jugadores y campeones
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const equipoQuery = `
            SELECT 
                e.id_equipo, e.nombre, e.victorias,
                e.jugador_1, e.jugador_2, e.jugador_3, e.jugador_4, e.jugador_5,
                e.campeon_1, e.campeon_2, e.campeon_3, e.campeon_4, e.campeon_5
            FROM equipos e
            WHERE e.id_equipo = $1;
        `;
        const equipoResult = await pool.query(equipoQuery, [id]);

        if (equipoResult.rows.length === 0) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        const equipo = equipoResult.rows[0];

        const jugadores = await Promise.all(
            [equipo.jugador_1, equipo.jugador_2, equipo.jugador_3, equipo.jugador_4, equipo.jugador_5].map(async (jugadorId) => {
                const jugadorResult = await pool.query('SELECT * FROM jugadores WHERE id_jugador = $1', [jugadorId]);
                return jugadorResult.rows[0];
            })
        );

        const campeones = await Promise.all(
            [equipo.campeon_1, equipo.campeon_2, equipo.campeon_3, equipo.campeon_4, equipo.campeon_5].map(async (campeonId) => {
                const campeonResult = await pool.query('SELECT * FROM campeones WHERE id_campeon = $1', [campeonId]);
                return campeonResult.rows[0];
            })
        );

        res.json({
            id_equipo: equipo.id_equipo,
            nombre: equipo.nombre,
            victorias: equipo.victorias,
            jugadores,
            campeones
        });
    } catch (error) {
        console.error('Error al obtener equipo:', error);
        res.status(500).json({ error: 'Error al obtener equipo' });
    }
};

// Crear un nuevo equipo
exports.create = async (req, res) => {
    try {
        const { nombre, victorias, jugador_1, jugador_2, jugador_3, jugador_4, jugador_5, campeon_1, campeon_2, campeon_3, campeon_4, campeon_5 } = req.body;

        const query = `
            INSERT INTO equipos (nombre, victorias, jugador_1, jugador_2, jugador_3, jugador_4, jugador_5, campeon_1, campeon_2, campeon_3, campeon_4, campeon_5)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id_equipo;
        `;
        const result = await pool.query(query, [nombre, victorias, jugador_1, jugador_2, jugador_3, jugador_4, jugador_5, campeon_1, campeon_2, campeon_3, campeon_4, campeon_5]);

        res.status(201).json({ id_equipo: result.rows[0].id_equipo });
    } catch (error) {
        console.error('Error al crear equipo:', error);
        res.status(500).json({ error: 'Error al crear equipo' });
    }
};

// Actualizar un equipo
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, victorias, jugador_1, jugador_2, jugador_3, jugador_4, jugador_5, campeon_1, campeon_2, campeon_3, campeon_4, campeon_5 } = req.body;

        const query = `
            UPDATE equipos SET 
                nombre = $1, victorias = $2,
                jugador_1 = $3, jugador_2 = $4, jugador_3 = $5, jugador_4 = $6, jugador_5 = $7,
                campeon_1 = $8, campeon_2 = $9, campeon_3 = $10, campeon_4 = $11, campeon_5 = $12
            WHERE id_equipo = $13 RETURNING *;
        `;
        const result = await pool.query(query, [nombre, victorias, jugador_1, jugador_2, jugador_3, jugador_4, jugador_5, campeon_1, campeon_2, campeon_3, campeon_4, campeon_5, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al actualizar equipo:', error);
        res.status(500).json({ error: 'Error al actualizar equipo' });
    }
};

// Eliminar un equipo
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM equipos WHERE id_equipo = $1 RETURNING *;', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        res.json({ message: 'Equipo eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar equipo:', error);
        res.status(500).json({ error: 'Error al eliminar equipo' });
    }
};