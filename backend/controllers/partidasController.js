const pool = require('../config/db');

// Consulta para obtener todas las partidas con jugadores y campeones
exports.getAll = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT p.*, 
                   e1.nombre AS equipo_1_nombre,
                   j1_1.id_jugador AS equipo_1_jugador_1_id, j1_1.nombre AS equipo_1_jugador_1_nombre,
                   j1_2.id_jugador AS equipo_1_jugador_2_id, j1_2.nombre AS equipo_1_jugador_2_nombre,
                   j1_3.id_jugador AS equipo_1_jugador_3_id, j1_3.nombre AS equipo_1_jugador_3_nombre,
                   j1_4.id_jugador AS equipo_1_jugador_4_id, j1_4.nombre AS equipo_1_jugador_4_nombre,
                   j1_5.id_jugador AS equipo_1_jugador_5_id, j1_5.nombre AS equipo_1_jugador_5_nombre,
                   c1_1.id_campeon AS equipo_1_campeon_1_id, c1_1.nombre AS equipo_1_campeon_1_nombre,
                   c1_2.id_campeon AS equipo_1_campeon_2_id, c1_2.nombre AS equipo_1_campeon_2_nombre,
                   c1_3.id_campeon AS equipo_1_campeon_3_id, c1_3.nombre AS equipo_1_campeon_3_nombre,
                   c1_4.id_campeon AS equipo_1_campeon_4_id, c1_4.nombre AS equipo_1_campeon_4_nombre,
                   c1_5.id_campeon AS equipo_1_campeon_5_id, c1_5.nombre AS equipo_1_campeon_5_nombre,
                   e2.nombre AS equipo_2_nombre,
                   j2_1.id_jugador AS equipo_2_jugador_1_id, j2_1.nombre AS equipo_2_jugador_1_nombre,
                   j2_2.id_jugador AS equipo_2_jugador_2_id, j2_2.nombre AS equipo_2_jugador_2_nombre,
                   j2_3.id_jugador AS equipo_2_jugador_3_id, j2_3.nombre AS equipo_2_jugador_3_nombre,
                   j2_4.id_jugador AS equipo_2_jugador_4_id, j2_4.nombre AS equipo_2_jugador_4_nombre,
                   j2_5.id_jugador AS equipo_2_jugador_5_id, j2_5.nombre AS equipo_2_jugador_5_nombre,
                   c2_1.id_campeon AS equipo_2_campeon_1_id, c2_1.nombre AS equipo_2_campeon_1_nombre,
                   c2_2.id_campeon AS equipo_2_campeon_2_id, c2_2.nombre AS equipo_2_campeon_2_nombre,
                   c2_3.id_campeon AS equipo_2_campeon_3_id, c2_3.nombre AS equipo_2_campeon_3_nombre,
                   c2_4.id_campeon AS equipo_2_campeon_4_id, c2_4.nombre AS equipo_2_campeon_4_nombre,
                   c2_5.id_campeon AS equipo_2_campeon_5_id, c2_5.nombre AS equipo_2_campeon_5_nombre
            FROM partidas p
            LEFT JOIN equipos e1 ON p.equipo_1 = e1.id_equipo
            LEFT JOIN equipos e2 ON p.equipo_2 = e2.id_equipo
            LEFT JOIN jugadores j1_1 ON e1.jugador_1 = j1_1.id_jugador
            LEFT JOIN jugadores j1_2 ON e1.jugador_2 = j1_2.id_jugador
            LEFT JOIN jugadores j1_3 ON e1.jugador_3 = j1_3.id_jugador
            LEFT JOIN jugadores j1_4 ON e1.jugador_4 = j1_4.id_jugador
            LEFT JOIN jugadores j1_5 ON e1.jugador_5 = j1_5.id_jugador
            LEFT JOIN campeones c1_1 ON e1.campeon_1 = c1_1.id_campeon
            LEFT JOIN campeones c1_2 ON e1.campeon_2 = c1_2.id_campeon
            LEFT JOIN campeones c1_3 ON e1.campeon_3 = c1_3.id_campeon
            LEFT JOIN campeones c1_4 ON e1.campeon_4 = c1_4.id_campeon
            LEFT JOIN campeones c1_5 ON e1.campeon_5 = c1_5.id_campeon
            LEFT JOIN jugadores j2_1 ON e2.jugador_1 = j2_1.id_jugador
            LEFT JOIN jugadores j2_2 ON e2.jugador_2 = j2_2.id_jugador
            LEFT JOIN jugadores j2_3 ON e2.jugador_3 = j2_3.id_jugador
            LEFT JOIN jugadores j2_4 ON e2.jugador_4 = j2_4.id_jugador
            LEFT JOIN jugadores j2_5 ON e2.jugador_5 = j2_5.id_jugador
            LEFT JOIN campeones c2_1 ON e2.campeon_1 = c2_1.id_campeon
            LEFT JOIN campeones c2_2 ON e2.campeon_2 = c2_2.id_campeon
            LEFT JOIN campeones c2_3 ON e2.campeon_3 = c2_3.id_campeon
            LEFT JOIN campeones c2_4 ON e2.campeon_4 = c2_4.id_campeon
            LEFT JOIN campeones c2_5 ON e2.campeon_5 = c2_5.id_campeon
        `);
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Consulta para obtener una partida específica con jugadores y campeones
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            SELECT p.*, 
                   e1.nombre AS equipo_1_nombre,
                   j1_1.id_jugador AS equipo_1_jugador_1_id, j1_1.nombre AS equipo_1_jugador_1_nombre,
                   j1_2.id_jugador AS equipo_1_jugador_2_id, j1_2.nombre AS equipo_1_jugador_2_nombre,
                   j1_3.id_jugador AS equipo_1_jugador_3_id, j1_3.nombre AS equipo_1_jugador_3_nombre,
                   j1_4.id_jugador AS equipo_1_jugador_4_id, j1_4.nombre AS equipo_1_jugador_4_nombre,
                   j1_5.id_jugador AS equipo_1_jugador_5_id, j1_5.nombre AS equipo_1_jugador_5_nombre,
                   c1_1.id_campeon AS equipo_1_campeon_1_id, c1_1.nombre AS equipo_1_campeon_1_nombre,
                   c1_2.id_campeon AS equipo_1_campeon_2_id, c1_2.nombre AS equipo_1_campeon_2_nombre,
                   c1_3.id_campeon AS equipo_1_campeon_3_id, c1_3.nombre AS equipo_1_campeon_3_nombre,
                   c1_4.id_campeon AS equipo_1_campeon_4_id, c1_4.nombre AS equipo_1_campeon_4_nombre,
                   c1_5.id_campeon AS equipo_1_campeon_5_id, c1_5.nombre AS equipo_1_campeon_5_nombre,
                   e2.nombre AS equipo_2_nombre,
                   j2_1.id_jugador AS equipo_2_jugador_1_id, j2_1.nombre AS equipo_2_jugador_1_nombre,
                   j2_2.id_jugador AS equipo_2_jugador_2_id, j2_2.nombre AS equipo_2_jugador_2_nombre,
                   j2_3.id_jugador AS equipo_2_jugador_3_id, j2_3.nombre AS equipo_2_jugador_3_nombre,
                   j2_4.id_jugador AS equipo_2_jugador_4_id, j2_4.nombre AS equipo_2_jugador_4_nombre,
                   j2_5.id_jugador AS equipo_2_jugador_5_id, j2_5.nombre AS equipo_2_jugador_5_nombre,
                   c2_1.id_campeon AS equipo_2_campeon_1_id, c2_1.nombre AS equipo_2_campeon_1_nombre,
                   c2_2.id_campeon AS equipo_2_campeon_2_id, c2_2.nombre AS equipo_2_campeon_2_nombre,
                   c2_3.id_campeon AS equipo_2_campeon_3_id, c2_3.nombre AS equipo_2_campeon_3_nombre,
                   c2_4.id_campeon AS equipo_2_campeon_4_id, c2_4.nombre AS equipo_2_campeon_4_nombre,
                   c2_5.id_campeon AS equipo_2_campeon_5_id, c2_5.nombre AS equipo_2_campeon_5_nombre
            FROM partidas p
            LEFT JOIN equipos e1 ON p.equipo_1 = e1.id_equipo
            LEFT JOIN equipos e2 ON p.equipo_2 = e2.id_equipo
            LEFT JOIN jugadores j1_1 ON e1.jugador_1 = j1_1.id_jugador
            LEFT JOIN jugadores j1_2 ON e1.jugador_2 = j1_2.id_jugador
            LEFT JOIN jugadores j1_3 ON e1.jugador_3 = j1_3.id_jugador
            LEFT JOIN jugadores j1_4 ON e1.jugador_4 = j1_4.id_jugador
            LEFT JOIN jugadores j1_5 ON e1.jugador_5 = j1_5.id_jugador
            LEFT JOIN campeones c1_1 ON e1.campeon_1 = c1_1.id_campeon
            LEFT JOIN campeones c1_2 ON e1.campeon_2 = c1_2.id_campeon
            LEFT JOIN campeones c1_3 ON e1.campeon_3 = c1_3.id_campeon
            LEFT JOIN campeones c1_4 ON e1.campeon_4 = c1_4.id_campeon
            LEFT JOIN campeones c1_5 ON e1.campeon_5 = c1_5.id_campeon
            LEFT JOIN jugadores j2_1 ON e2.jugador_1 = j2_1.id_jugador
            LEFT JOIN jugadores j2_2 ON e2.jugador_2 = j2_2.id_jugador
            LEFT JOIN jugadores j2_3 ON e2.jugador_3 = j2_3.id_jugador
            LEFT JOIN jugadores j2_4 ON e2.jugador_4 = j2_4.id_jugador
            LEFT JOIN jugadores j2_5 ON e2.jugador_5 = j2_5.id_jugador
            LEFT JOIN campeones c2_1 ON e2.campeon_1 = c2_1.id_campeon
            LEFT JOIN campeones c2_2 ON e2.campeon_2 = c2_2.id_campeon
            LEFT JOIN campeones c2_3 ON e2.campeon_3 = c2_3.id_campeon
            LEFT JOIN campeones c2_4 ON e2.campeon_4 = c2_4.id_campeon
            LEFT JOIN campeones c2_5 ON e2.campeon_5 = c2_5.id_campeon
            WHERE p.id_partida = $1
        `, [id]);

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
            'INSERT INTO partidas (nombre, fecha_inicio,estado, equipo_1, equipo_2) VALUES ($1, NOW(),$2, $3, $4) RETURNING *',
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
