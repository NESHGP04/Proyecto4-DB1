CREATE TYPE genero_enum AS ENUM ('M', 'F', 'O');
CREATE TYPE estado_lesion_enum AS ENUM ('activa', 'recuperado', 'crónica');
CREATE TYPE rol_entrenador_enum AS ENUM ('principal', 'asistente', 'preparador físico', 'analista');
CREATE TYPE resultado_partido_enum AS ENUM ('ganado', 'perdido', 'empate', 'pendiente');
CREATE TYPE posicion_enum AS ENUM (
    'pitcher', 'catcher', 'primera_base', 'segunda_base', 
    'tercera_base', 'shortstop', 'jardinero_izquierdo', 
    'jardinero_central', 'jardinero_derecho', 'designado'
);
CREATE TYPE tipo_estadistica_enum AS ENUM ('bateo', 'pitcheo', 'defensa');


--TABLAS PRINCIPALES--
CREATE TABLE equipos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    ciudad VARCHAR(100),
    fecha_creacion DATE,
    division_id INT NOT NULL REFERENCES division(id)
);

CREATE TABLE division (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
);

CREATE TABLE jugadores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero genero_enum NOT NULL,
    equipo_id INT NOT NULL REFERENCES equipos(id),
    fecha_ingreso DATE NOT NULL DEFAULT CURRENT_DATE,
    nacionalidad VARCHAR(50),
    UNIQUE(nombre, apellido, fecha_nacimiento)
);

CREATE TABLE entrenadores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    rol rol_entrenador_enum NOT NULL,
    equipo_id INT NOT NULL REFERENCES equipos(id),
    fecha_ingreso DATE NOT NULL DEFAULT CURRENT_DATE,
    correo VARCHAR(150) UNIQUE
);

CREATE TABLE estadios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    ubicacion VARCHAR(150),
    capacidad INT CHECK (capacidad > 0)
);

CREATE TABLE torneos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    temporada VARCHAR(50),
    division_id INT NOT NULL REFERENCES division(id),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'activo'
);

CREATE TABLE temporadas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL
);


--PARTIDOS, CALENDARIOS Y ARBITRAJE --
CREATE TABLE partidos (
    id SERIAL PRIMARY KEY,
    torneo_id INT NOT NULL REFERENCES torneos(id),
    equipo_local_id INT NOT NULL REFERENCES equipos(id),
    equipo_visitante_id INT NOT NULL REFERENCES equipos(id),
    fecha_hora TIMESTAMP NOT NULL,
    resultado resultado_partido_enum DEFAULT 'pendiente',
    score_local INT DEFAULT 0,
    score_visitante INT DEFAULT 0,
    estadio_id INT NOT NULL REFERENCES estadios(id)
);

CREATE TABLE arbitros (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    nivel VARCHAR(50),
    correo VARCHAR(150) UNIQUE
);

CREATE TABLE arbitraje (
    id SERIAL PRIMARY KEY,
    partido_id INT NOT NULL REFERENCES partidos(id) ON DELETE CASCADE,
    arbitro_id INT NOT NULL REFERENCES arbitros(id) ON DELETE CASCADE,
    rol VARCHAR(50) NOT NULL,
    UNIQUE (partido_id, arbitro_id)
);

CREATE TABLE calendario (
    id SERIAL PRIMARY KEY,
    temporada_id INT NOT NULL REFERENCES temporadas(id),
    fecha DATE NOT NULL,
    descripcion TEXT
);


--POSICIONES Y RELACIONES-- 
CREATE TABLE posiciones (
    id SERIAL PRIMARY KEY,
    nombre posicion_enum NOT NULL UNIQUE,
    descripcion TEXT
);

CREATE TABLE jugadores_posicion (
    jugador_id INT NOT NULL REFERENCES jugadores(id),
    posicion_id INT NOT NULL REFERENCES posiciones(id),
    temporada_id INT NOT NULL REFERENCES temporadas(id),
    PRIMARY KEY (jugador_id, posicion_id, temporada_id)
);


--ESTADISTICAS -- 
CREATE TABLE estadisticas_partido (
    id SERIAL PRIMARY KEY,
    partido_id INT NOT NULL REFERENCES partidos(id),
    jugador_id INT NOT NULL REFERENCES jugadores(id),
    hits INT DEFAULT 0,
    carreras INT DEFAULT 0,
    bases INT DEFAULT 0,
    errores INT DEFAULT 0,
    strikeouts INT DEFAULT 0,
    innings_lanzados NUMERIC(4,2) DEFAULT 0,
    carreras_permitidas INT DEFAULT 0,
    ponches INT DEFAULT 0,
    bases_por_bola INT DEFAULT 0,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (partido_id, jugador_id)
);

CREATE TABLE estadisticas_pitcher (
    id SERIAL PRIMARY KEY,
    partido_id INT NOT NULL REFERENCES partidos(id),
    jugador_id INT NOT NULL REFERENCES jugadores(id),
    innings_lanzados NUMERIC(4,2) NOT NULL DEFAULT 0,
    ponches INT DEFAULT 0,
    carreras_permitidas INT DEFAULT 0,
    bases_por_bola INT DEFAULT 0,
    hits_permitidos INT DEFAULT 0,
    UNIQUE(partido_id, jugador_id)
);

CREATE TABLE estadisticas_jugador (
    id SERIAL PRIMARY KEY,
    jugador_id INT NOT NULL REFERENCES jugadores(id),
    temporada_id INT NOT NULL REFERENCES temporadas(id),
    partidos_jugados INT DEFAULT 0,
    promedio_bateo NUMERIC(4,3) DEFAULT 0.000,
    homeruns INT DEFAULT 0,
    carreras_anotadas INT DEFAULT 0
);

--LESIONES Y FOTOS -- 
CREATE TABLE lesiones (
    id SERIAL PRIMARY KEY,
    jugador_id INT NOT NULL REFERENCES jugadores(id),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    tipo VARCHAR(100),
    descripcion TEXT,
    estado estado_lesion_enum NOT NULL DEFAULT 'activa'
);

CREATE TABLE fotos_jugadores (
    id SERIAL PRIMARY KEY,
    jugador_id INT NOT NULL REFERENCES jugadores(id),
    url TEXT NOT NULL,
    descripcion TEXT,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--RANKING-- 
CREATE TABLE ranking_equipos_torneo (
    id SERIAL PRIMARY KEY,
    torneo_id INT NOT NULL REFERENCES torneos(id),
    equipo_id INT NOT NULL REFERENCES equipos(id),
    division_id INT NOT NULL REFERENCES division(id),
    puntos INT DEFAULT 0,
    partidos_ganados INT DEFAULT 0,
    partidos_perdidos INT DEFAULT 0,
    partidos_empatados INT DEFAULT 0,
    UNIQUE(torneo_id, equipo_id)
);

--SANCIONES-- 
CREATE TABLE sanciones (
    id SERIAL PRIMARY KEY,
    jugador_id INT REFERENCES jugadores(id) ON DELETE SET NULL,
    equipo_id INT REFERENCES equipos(id) ON DELETE SET NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    motivo TEXT NOT NULL,
    tipo_sancion VARCHAR(50) NOT NULL, -- ej. suspensión, multa, advertencia
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--funcion para calcular edad de una jugador (por fecha de nacimiento)--
CREATE OR REPLACE FUNCTION calcular_edad(fecha_nac DATE) RETURNS INT AS $$
DECLARE
    edad INT;
BEGIN
    SELECT DATE_PART('year', AGE(fecha_nac)) INTO edad;
    RETURN edad;
END;
$$ LANGUAGE plpgsql;

--function para verificar el estado (lesionado o no) de un jugador--
CREATE OR REPLACE FUNCTION esta_lesionado(jugador INT) RETURNS BOOLEAN AS $$
DECLARE
    lesion_activa INT;
BEGIN
    SELECT COUNT(*) INTO lesion_activa
    FROM lesiones
    WHERE jugador_id = jugador AND estado = 'activa';
    RETURN lesion_activa > 0;
END;
$$ LANGUAGE plpgsql;

--trigger para no agregar stats a jugadores lesionados--
CREATE OR REPLACE FUNCTION validar_estadistica_lesion() RETURNS TRIGGER AS $$
BEGIN
    IF esta_lesionado(NEW.jugador_id) THEN
        RAISE EXCEPTION 'No se puede registrar estadística para jugador lesionado activamente';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validar_lesion_estadistica
BEFORE INSERT ON estadisticas_partido
FOR EACH ROW EXECUTE FUNCTION validar_estadistica_lesion();

--trigger para validar que una sancion tenga equipo o jugador--
CREATE OR REPLACE FUNCTION validar_sancion_entidad() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.jugador_id IS NULL AND NEW.equipo_id IS NULL THEN
        RAISE EXCEPTION 'Debe especificar al menos un jugador o un equipo para la sanción';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validar_sancion_entidad
BEFORE INSERT OR UPDATE ON sanciones
FOR EACH ROW EXECUTE FUNCTION validar_sancion_entidad();



--vista de jugadores con edad y equipo-- 
CREATE OR REPLACE VIEW vista_jugadores_info AS
SELECT
    j.id,
    j.nombre || ' ' || j.apellido AS nombre_completo,
    calcular_edad(j.fecha_nacimiento) AS edad,
    e.nombre AS equipo,
    d.nombre AS division,
    esta_lesionado(j.id) AS lesionado
FROM jugadores j
JOIN equipos e ON j.equipo_id = e.id
JOIN division d ON e.division_id = d.id;


--Vista resumen básica de partidos--
CREATE OR REPLACE VIEW vista_partidos_resumen AS
SELECT
    p.id,
    t.nombre AS torneo,
    p.fecha_hora,
    el.nombre AS equipo_local,
    ev.nombre AS equipo_visitante,
    s.nombre AS estadio,
    p.resultado,
    p.score_local,
    p.score_visitante
FROM partidos p
JOIN torneos t ON p.torneo_id = t.id
JOIN equipos el ON p.equipo_local_id = el.id
JOIN equipos ev ON p.equipo_visitante_id = ev.id
JOIN estadios s ON p.estadio_id = s.id;




