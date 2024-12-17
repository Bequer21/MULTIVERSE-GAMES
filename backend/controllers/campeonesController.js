const fs = require('fs');
const pool = require('../config/db');
const path = require('path');

// Obtener todos los campeones
// Obtener todos los campeones con sus habilidades completas
exports.getAll = async (req, res) => {
    try {
        const query = `
            SELECT 
                c.id_campeon, 
                c.nombre, 
                c.rol, 
                c.imagen, 
                c.historia, 
                c.dificultad, 
                c.fecha_creacion,
                h.id_habilidad AS habilidad_id,
                h.nombre AS habilidad_nombre,
                h.fuerza AS habilidad_fuerza,
                h.descripcion AS habilidad_descripcion,
                h.tiempo_enfriamiento AS habilidad_tiempo_enfriamiento,
                h.consumo_mana AS habilidad_consumo_mana
            FROM campeones c
            LEFT JOIN habilidades h ON c.habilidad = h.id_habilidad;
        `;

        const result = await pool.query(query);

        const campeones = result.rows.map(row => ({
            id_campeon: row.id_campeon,
            nombre: row.nombre,
            rol: row.rol,
            imagen: row.imagen,
            historia: row.historia,
            dificultad: row.dificultad,
            fecha_creacion: row.fecha_creacion,
            habilidad: row.habilidad_id
                ? {
                      id: row.habilidad_id,
                      nombre: row.habilidad_nombre,
                      fuerza: row.habilidad_fuerza,
                      descripcion: row.habilidad_descripcion,
                      tiempo_enfriamiento: row.habilidad_tiempo_enfriamiento,
                      consumo_mana: row.habilidad_consumo_mana
                  }
                : null
        }));

        res.json(campeones);
    } catch (error) {
        console.error('Error al obtener campeones:', error);
        res.status(500).json({ error: 'Error al obtener los campeones' });
    }
};

// Obtener un campeón por ID con su habilidad completa
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        const query = `
            SELECT 
                c.id_campeon, 
                c.nombre, 
                c.rol, 
                c.imagen, 
                c.historia, 
                c.dificultad, 
                c.fecha_creacion,
                h.id_habilidad AS habilidad_id,
                h.nombre AS habilidad_nombre,
                h.fuerza AS habilidad_fuerza,
                h.descripcion AS habilidad_descripcion,
                h.tiempo_enfriamiento AS habilidad_tiempo_enfriamiento,
                h.consumo_mana AS habilidad_consumo_mana
            FROM campeones c
            LEFT JOIN habilidades h ON c.habilidad = h.id_habilidad
            WHERE c.id_campeon = $1;
        `;

        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Campeón no encontrado' });
        }

        const row = result.rows[0];
        const campeon = {
            id_campeon: row.id_campeon,
            nombre: row.nombre,
            rol: row.rol,
            imagen: row.imagen,
            historia: row.historia,
            dificultad: row.dificultad,
            fecha_creacion: row.fecha_creacion,
            habilidad: row.habilidad_id
                ? {
                      id: row.habilidad_id,
                      nombre: row.habilidad_nombre,
                      fuerza: row.habilidad_fuerza,
                      descripcion: row.habilidad_descripcion,
                      tiempo_enfriamiento: row.habilidad_tiempo_enfriamiento,
                      consumo_mana: row.habilidad_consumo_mana
                  }
                : null
        };

        res.json(campeon);
    } catch (error) {
        console.error('Error al obtener el campeón:', error);
        res.status(500).json({ error: 'Error al obtener el campeón' });
    }
};


// Crear un nuevo campeón
exports.create = async (req, res) => {
    try {
        const { nombre, habilidad, rol, historia, dificultad } = req.body;
        let imagenUrl = null;


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

        // Obtener la información actual del campeón para identificar la imagen anterior
        const existingChampion = await pool.query(
            `SELECT imagen FROM campeones WHERE id_campeon = $1`,
            [id]
        );

        if (existingChampion.rows.length === 0) {
            return res.status(404).json({ error: 'Campeón no encontrado' });
        }

        let imagenUrl = existingChampion.rows[0].imagen; // Mantener la URL existente si no hay archivo nuevo

        // Si se carga un nuevo archivo
        if (req.file) {
            // Generar el nuevo nombre de archivo
            const nuevoNombre = `${id}_${nombre.replace(/\s+/g, '_')}.jpg`;
            const oldPath = `img/campeones/${req.file.filename}`;
            const newPath = `img/campeones/${nuevoNombre}`;

            // Renombrar el archivo subido
            fs.renameSync(oldPath, newPath);

            // Actualizar la URL de la imagen
            imagenUrl = `/img/campeones/${nuevoNombre}`;

            // Eliminar la imagen anterior si existía y es diferente a la actual
            const imagenAnterior = existingChampion.rows[0].imagen;
            if (imagenAnterior && imagenAnterior !== imagenUrl) {
                const imagenAnteriorPath = path.join(__dirname, '..', imagenAnterior);
                if (fs.existsSync(imagenAnteriorPath)) {
                    fs.unlinkSync(imagenAnteriorPath);
                }
            }
        }

        // Actualizar los datos del campeón en la base de datos
        const result = await pool.query(
            `UPDATE campeones SET 
            nombre = $1, 
            habilidad = $2, 
            rol = $3, 
            imagen = $4, 
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
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el campeón' });
        console.log(result)
    }
};
// Eliminar un campeón
exports.remove = async (req, res) => {
    try {
        const { id } = req.params;

        // Obtener el campeón antes de eliminarlo para poder acceder a su imagen
        const result = await pool.query('SELECT imagen FROM campeones WHERE id_campeon = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Campeón no encontrado' });
        }

        // Obtener la URL de la imagen asociada con el campeón
        const imagenUrl = result.rows[0].imagen;

        // Si el campeón tiene una imagen, eliminar el archivo de la imagen
        if (imagenUrl) {
            const imagePath = `.${imagenUrl}`; // Asegúrate de incluir el directorio actual

            // Eliminar la imagen del sistema de archivos
            try {
                fs.unlinkSync(imagePath); // Elimina el archivo
                console.log('Imagen eliminada correctamente');
            } catch (error) {
                console.error('Error al eliminar la imagen:', error);
            }
        }

        // Eliminar el campeón de la base de datos
        await pool.query('DELETE FROM campeones WHERE id_campeon = $1', [id]);

        res.json({ message: 'Campeón y su imagen eliminados correctamente' });
    } catch (error) {
        console.error('Error al eliminar el campeón:', error);
        res.status(500).json({ error: 'Error al eliminar el campeón' });
    }
};