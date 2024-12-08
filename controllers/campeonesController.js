const fs = require('fs');
const pool = require('../config/db');

// Obtener todos los campeones
exports.getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM campeones');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener un campeón por ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM campeones WHERE id_campeon = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Campeón no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el campeón' });
    }
};

// Crear un nuevo campeón
exports.create = async (req, res) => {
    try {
        const { nombre, habilidad, rol, historia, dificultad } = req.body;
        let imagenUrl = null;

        // Verificar si ya existe un campeón con el mismo nombre
        const checkNombreResult = await pool.query(
            'SELECT * FROM campeones WHERE nombre = $1',
            [nombre]
        );

        // Si el campeón ya existe, no se guarda la imagen y se responde con un error
        if (checkNombreResult.rows.length > 0) {
            // Si hay un archivo en la solicitud, eliminamos la imagen que no debe guardarse
            if (req.file) {
                fs.unlinkSync(`img/campeones/${req.file.filename}`); // Eliminar archivo subido
            }
            return res.status(400).json({ error: 'Ya existe un campeón con ese nombre' });
        }

        // Si hay un archivo, generamos la URL de la imagen
        if (req.file) {
            imagenUrl = `/img/campeones/${req.file.filename}`;
        }

        // Insertamos el campeón en la base de datos
        const result = await pool.query(
            `INSERT INTO campeones (nombre, habilidad, rol, historia, dificultad, fecha_creacion, imagen) 
            VALUES ($1, $2, $3, $4, $5, NOW(), $6) RETURNING id_campeon`,
            [nombre, habilidad, rol, historia, dificultad, imagenUrl]
        );

        const campeonId = result.rows[0].id_campeon;
        console.log('ID del campeón insertado:', campeonId);

        // Si hay un archivo, renombramos el archivo
        if (req.file) {
            const nuevoNombre = `${campeonId}_${nombre.replace(/\s+/g, '_')}.jpg`; 
            const oldPath = `img/campeones/${req.file.filename}`;
            const newPath = `img/campeones/${nuevoNombre}`;

            // Renombramos el archivo en el sistema de archivos
            fs.renameSync(oldPath, newPath);

            // Actualizamos la URL de la imagen en la base de datos
            imagenUrl = `/img/campeones/${nuevoNombre}`;

            // Actualizamos la base de datos con la nueva URL de la imagen
            await pool.query(
                `UPDATE campeones SET imagen = $1 WHERE id_campeon = $2`,
                [imagenUrl, campeonId]
            );
        }

        // Respondemos con el campeón creado
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error en la creación del campeón:', error);
        res.status(500).json({ error: 'Error al crear el campeón' });
    }
};
// Actualizar un campeón
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, habilidad, rol, historia, dificultad } = req.body;
        const imagenUrl = req.file ? `/img/campeones/${id}_${nombre.replace(/\s+/g, '_')}.jpg` : null;

        const result = await pool.query(
            `UPDATE campeones SET 
            nombre = $1, 
            habilidad = $2, 
            rol = $3, 
            imagen = COALESCE($4, imagen), 
            historia = $5, 
            dificultad = $6 
            WHERE id_campeon = $7 RETURNING *`,
            [nombre, habilidad, rol, imagenUrl, historia, dificultad, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Campeón no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el campeón' });
    }
};

// Eliminar un campeón
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM campeones WHERE id_campeon = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Campeón no encontrado' });
        }

        res.json({ message: 'Campeón eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el campeón' });
    }
};
