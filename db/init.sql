-- tabla jugadores
CREATE TABLE jugadores (
    id_jugador SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    contrasena VARCHAR(30) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    nivel INT DEFAULT 1,
    estado VARCHAR(20),
    pais VARCHAR(50),
    servidor VARCHAR(50)
);

-- tabla habilidades
CREATE TABLE habilidades (
    id_habilidad SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    fuerza VARCHAR(20),
    descripcion VARCHAR(255),
    tiempo_enfriamiento VARCHAR(20),
    consumo_mana VARCHAR(20)
);

-- tabla campeones
CREATE TABLE campeones (
    id_campeon SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    habilidad INT NOT NULL,
    rol VARCHAR(50),
    imagen VARCHAR(255),
    historia VARCHAR(200),
    dificultad VARCHAR(50),
    fecha_creacion DATE DEFAULT CURRENT_DATE,
    CONSTRAINT fk_habilidad FOREIGN KEY (habilidad) REFERENCES habilidades(id_habilidad)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- tabla equipos
CREATE TABLE equipos (
    id_equipo SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    victorias INT DEFAULT 0,
    jugador_1 INT NOT NULL,
    jugador_2 INT NOT NULL,
    jugador_3 INT NOT NULL,
    jugador_4 INT NOT NULL,
    jugador_5 INT NOT NULL,
    campeon_1 INT NOT NULL,
    campeon_2 INT NOT NULL,
    campeon_3 INT NOT NULL,
    campeon_4 INT NOT NULL,
    campeon_5 INT NOT NULL,
    CONSTRAINT fk_jugador1 FOREIGN KEY (jugador_1) REFERENCES jugadores(id_jugador) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_jugador2 FOREIGN KEY (jugador_2) REFERENCES jugadores(id_jugador) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_jugador3 FOREIGN KEY (jugador_3) REFERENCES jugadores(id_jugador) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_jugador4 FOREIGN KEY (jugador_4) REFERENCES jugadores(id_jugador) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_jugador5 FOREIGN KEY (jugador_5) REFERENCES jugadores(id_jugador) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_campeon1 FOREIGN KEY (campeon_1) REFERENCES campeones(id_campeon) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_campeon2 FOREIGN KEY (campeon_2) REFERENCES campeones(id_campeon) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_campeon3 FOREIGN KEY (campeon_3) REFERENCES campeones(id_campeon) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_campeon4 FOREIGN KEY (campeon_4) REFERENCES campeones(id_campeon) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_campeon5 FOREIGN KEY (campeon_5) REFERENCES campeones(id_campeon) ON DELETE CASCADE ON UPDATE CASCADE
);

-- tabla partidas
CREATE TABLE partidas (
    id_partida SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio VARCHAR(100) NOT NULL,
    fecha_fin VARCHAR(100),
    estado VARCHAR(20),
    equipo_1 INT NOT NULL,
    equipo_2 INT NOT NULL,
    ganador VARCHAR(100),
    CONSTRAINT fk_equipo1 FOREIGN KEY (equipo_1) REFERENCES equipos(id_equipo) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_equipo2 FOREIGN KEY (equipo_2) REFERENCES equipos(id_equipo) ON DELETE CASCADE ON UPDATE CASCADE
);