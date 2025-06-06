-- Insertar Divisiones
INSERT INTO division (nombre, descripcion) VALUES
('Primera', 'División principal'),
('Segunda', 'División secundaria'),
('Tercera', 'División amateur'),
('Juvenil', 'División juvenil'),
('Senior', 'División senior'),
('Femenina', 'División femenina'),
('Mixta', 'División mixta'),
('Internacional', 'División internacional'),
('Local', 'División local'),
('Veteranos', 'División veteranos');

-- Insertar Equipos
INSERT INTO equipos (nombre, ciudad, fecha_creacion, division_id) VALUES
('Toros', 'Guatemala City', '2000-03-01', 1),
('Leones', 'Antigua', '1998-06-15', 1),
('Águilas', 'Quetzaltenango', '2005-09-10', 2),
('Jaguares', 'Escuintla', '2010-11-22', 2),
('Panteras', 'Chimaltenango', '2003-05-30', 3),
('Tigres', 'Sacatepéquez', '1997-08-12', 3),
('Caimanes', 'Petén', '2012-07-07', 4),
('Halcones', 'Huehuetenango', '2014-02-18', 4),
('Cobras', 'Izabal', '2009-10-05', 5),
('Serpientes', 'Retalhuleu', '2001-12-20', 5);

-- Insertar Jugadores
INSERT INTO jugadores (nombre, apellido, fecha_nacimiento, genero, equipo_id) VALUES
('Carlos', 'Ramirez', '1995-04-10', 'M', 1),
('Ana', 'Lopez', '1998-07-22', 'F', 1),
('Miguel', 'Sanchez', '1990-02-15', 'M', 2),
('Laura', 'Perez', '1996-09-09', 'F', 2),
('Jose', 'Gomez', '1993-05-05', 'M', 3),
('Maria', 'Torres', '1997-11-11', 'F', 3),
('Luis', 'Fernandez', '1988-01-20', 'M', 4),
('Sofia', 'Diaz', '1999-03-25', 'F', 4),
('Juan', 'Martinez', '1992-08-18', 'M', 5),
('Isabel', 'Rodriguez', '1994-12-30', 'F', 5);

-- Insertar Entrenadores
INSERT INTO entrenadores (nombre, apellido, rol, equipo_id, fecha_ingreso, correo) VALUES
('Pedro', 'Alvarez', 'principal', 1, '2015-01-10', 'pedro.alvarez@toros.com'),
('Luis', 'Mendez', 'asistente', 1, '2017-03-15', 'luis.mendez@toros.com'),
('Jorge', 'Castillo', 'principal', 2, '2014-05-20', 'jorge.castillo@leones.com'),
('Ana', 'Martinez', 'asistente', 2, '2018-07-01', 'ana.martinez@leones.com'),
('Ricardo', 'Lopez', 'principal', 3, '2016-09-10', 'ricardo.lopez@aguilas.com'),
('Maria', 'Garcia', 'preparador físico', 3, '2019-11-05', 'maria.garcia@aguilas.com'),
('Carlos', 'Diaz', 'principal', 4, '2013-02-28', 'carlos.diaz@jaguares.com'),
('Elena', 'Vargas', 'analista', 4, '2018-06-17', 'elena.vargas@jaguares.com'),
('Roberto', 'Herrera', 'principal', 5, '2017-04-12', 'roberto.herrera@panteras.com'),
('Luisa', 'Fernandez', 'asistente', 5, '2020-01-09', 'luisa.fernandez@panteras.com');

-- Insertar Estadios
INSERT INTO estadios (nombre, ubicacion, capacidad) VALUES
('Estadio Nacional', 'Guatemala City', 15000),
('Estadio La Bombonera', 'Antigua', 8000),
('Estadio Xela', 'Quetzaltenango', 5000),
('Estadio Escuintla', 'Escuintla', 6000),
('Estadio Chimaltenango', 'Chimaltenango', 4500),
('Estadio Sacatepéquez', 'Sacatepéquez', 4000),
('Estadio Petén', 'Petén', 3500),
('Estadio Huehuetenango', 'Huehuetenango', 3000),
('Estadio Izabal', 'Izabal', 2000),
('Estadio Retalhuleu', 'Retalhuleu', 2500);

-- Insertar Temporadas
INSERT INTO temporadas (nombre, fecha_inicio, fecha_fin) VALUES
('Temporada 2023', '2023-01-01', '2023-12-31'),
('Temporada 2022', '2022-01-01', '2022-12-31'),
('Temporada 2021', '2021-01-01', '2021-12-31'),
('Temporada 2020', '2020-01-01', '2020-12-31'),
('Temporada 2019', '2019-01-01', '2019-12-31'),
('Temporada 2018', '2018-01-01', '2018-12-31'),
('Temporada 2017', '2017-01-01', '2017-12-31'),
('Temporada 2016', '2016-01-01', '2016-12-31'),
('Temporada 2015', '2015-01-01', '2015-12-31'),
('Temporada 2014', '2014-01-01', '2014-12-31');

-- Insertar Torneos
INSERT INTO torneos (nombre, temporada, division_id, fecha_inicio, fecha_fin, estado) VALUES
('Torneo Primavera 2023', '2023', 1, '2023-03-01', '2023-05-31', 'activo'),
('Torneo Verano 2023', '2023', 1, '2023-06-01', '2023-08-31', 'activo'),
('Torneo Otoño 2022', '2022', 2, '2022-09-01', '2022-11-30', 'finalizado'),
('Torneo Invierno 2022', '2022', 2, '2022-12-01', '2023-02-28', 'finalizado'),
('Torneo Juvenil 2023', '2023', 4, '2023-04-01', '2023-06-30', 'activo'),
('Torneo Senior 2023', '2023', 5, '2023-05-01', '2023-07-31', 'activo'),
('Torneo Femenino 2023', '2023', 6, '2023-03-15', '2023-06-15', 'activo'),
('Torneo Mixto 2023', '2023', 7, '2023-06-15', '2023-09-15', 'activo'),
('Torneo Local 2023', '2023', 9, '2023-07-01', '2023-09-30', 'activo'),
('Torneo Veteranos 2023', '2023', 10, '2023-08-01', '2023-10-31', 'activo');

-- Insertar Posiciones
INSERT INTO posiciones (nombre, descripcion) VALUES
('pitcher', 'Lanzador principal'),
('catcher', 'Receptor del equipo'),
('primera_base', 'Jugador en primera base'),
('segunda_base', 'Jugador en segunda base'),
('tercera_base', 'Jugador en tercera base'),
('shortstop', 'Jugador entre segunda y tercera base'),
('jardinero_izquierdo', 'Jugador en jardín izquierdo'),
('jardinero_central', 'Jugador en jardín central'),
('jardinero_derecho', 'Jugador en jardín derecho'),
('designado', 'Jugador designado para batear');

-- Insertar Jugadores_Posicion (relación N:M con temporada)
INSERT INTO jugadores_posicion (jugador_id, posicion_id, temporada_id) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(9, 9, 1),
(10, 10, 1);

-- Insertar Arbitros
INSERT INTO arbitros (nombre, apellido, nivel, correo) VALUES
('Juan', 'Perez', 'Profesional', 'juan.perez@email.com'),
('Maria', 'Gonzalez', 'Amateur', 'maria.gonzalez@email.com'),
('Carlos', 'Lopez', 'Profesional', 'carlos.lopez@email.com'),
('Laura', 'Martinez', 'Amateur', 'laura.martinez@email.com'),
('Pedro', 'Ramirez', 'Profesional', 'pedro.ramirez@email.com'),
('Ana', 'Diaz', 'Amateur', 'ana.diaz@email.com'),
('Luis', 'Sanchez', 'Profesional', 'luis.sanchez@email.com'),
('Sofia', 'Torres', 'Amateur', 'sofia.torres@email.com'),
('Jorge', 'Vargas', 'Profesional', 'jorge.vargas@email.com'),
('Elena', 'Gutierrez', 'Amateur', 'elena.gutierrez@email.com');

-- Insertar Calendario (Eventos, fechas importantes)
INSERT INTO calendario (temporada_id, fecha, descripcion) VALUES
(1, '2023-03-01', 'Inicio Torneo Primavera'),
(1, '2023-05-31', 'Fin Torneo Primavera'),
(2, '2023-06-01', 'Inicio Torneo Verano'),
(2, '2023-08-31', 'Fin Torneo Verano'),
(3, '2022-09-01', 'Inicio Torneo Otoño'),
(3, '2022-11-30', 'Fin Torneo Otoño'),
(4, '2022-12-01', 'Inicio Torneo Invierno'),
(4, '2023-02-28', 'Fin Torneo Invierno'),
(5, '2023-04-01', 'Inicio Torneo Juvenil'),
(5, '2023-06-30', 'Fin Torneo Juvenil');

-- Insertar Partidos
INSERT INTO partidos (torneo_id, equipo_local_id, equipo_visitante_id, fecha_hora, resultado, score_local, score_visitante, estadio_id) VALUES
(1, 1, 2, '2023-03-05 15:00:00', 'ganado', 5, 3, 1),
(1, 3, 4, '2023-03-06 16:00:00', 'perdido', 2, 6, 2),
(2, 5, 6, '2023-06-10 17:00:00', 'pendiente', 0, 0, 3),
(2, 7, 8, '2023-06-11 18:00:00', 'pendiente', 0, 0, 4),
(3, 9, 10, '2022-09-12 14:00:00', 'ganado', 4, 2, 5),
(3, 2, 1, '2022-09-13 13:00:00', 'perdido', 1, 3, 6),
(4, 4, 3, '2022-12-15 12:00:00', 'ganado', 7, 5, 7),
(4, 6, 5, '2022-12-16 11:00:00', 'empate', 3, 3, 8),
(5, 8, 7, '2023-04-20 16:30:00', 'pendiente', 0, 0, 9),
(5, 10, 9, '2023-04-21 17:30:00', 'pendiente', 0, 0, 10);

-- Insertar Arbitraje (Asignar árbitros a partidos)
INSERT INTO arbitraje (partido_id, arbitro_id, rol) VALUES
(1, 1, 'principal'),
(1, 2, 'asistente'),
(2, 3, 'principal'),
(2, 4, 'asistente'),
(3, 5, 'principal'),
(3, 6, 'asistente'),
(4, 7, 'principal'),
(4, 8, 'asistente'),
(5, 9, 'principal'),
(5, 10, 'asistente');

-- Insertar Estadísticas Partido (jugadores)
INSERT INTO estadisticas_partido (partido_id, jugador_id, hits, carreras, bases, errores, strikeouts, innings_lanzados, carreras_permitidas, ponches, bases_por_bola) VALUES
(1, 1, 2, 1, 1, 0, 1, 0, 0, 0, 0),
(1, 2, 1, 0, 0, 1, 2, 0, 0, 0, 0),
(2, 3, 3, 2, 2, 0, 0, 0, 0, 0, 0),
(2, 4, 0, 0, 1, 2, 1, 0, 0, 0, 0),
(3, 5, 4, 2, 2, 1, 0, 0, 0, 0, 0),
(3, 6, 1, 0, 0, 0, 2, 0, 0, 0, 0),
(4, 7, 2, 1, 1, 0, 1, 0, 0, 0, 0),
(4, 8, 0, 0, 0, 2, 0, 0, 0, 0, 0),
(5, 9, 3, 1, 2, 0, 0, 0, 0, 0, 0),
(5, 10, 1, 0, 0, 1, 1, 0, 0, 0, 0);

-- Insertar Estadísticas Pitcher
INSERT INTO estadisticas_pitcher (partido_id, jugador_id, innings_lanzados, ponches, carreras_permitidas, bases_por_bola, hits_permitidos) VALUES
(1, 1, 7.0, 8, 2, 1, 5),
(2, 3, 6.5, 6, 3, 2, 7),
(3, 5, 7.0, 7, 1, 0, 4),
(4, 7, 5.0, 5, 4, 3, 8),
(5, 9, 6.0, 4, 2, 1, 6),
(1, 2, 7.0, 9, 0, 0, 3),
(2, 4, 6.0, 7, 2, 1, 5),
(3, 6, 7.0, 8, 3, 2, 6),
(4, 8, 5.5, 5, 1, 0, 4),
(5, 10, 6.5, 6, 3, 2, 7);

-- Insertar Fotos Jugadores
INSERT INTO fotos_jugadores (jugador_id, url, descripcion) VALUES
(1, 'https://example.com/photos/carlos1.jpg', 'Foto oficial 2023'),
(2, 'https://example.com/photos/ana1.jpg', 'Foto oficial 2023'),
(3, 'https://example.com/photos/miguel1.jpg', 'Foto entrenamiento'),
(4, 'https://example.com/photos/laura1.jpg', 'Foto oficial 2022'),
(5, 'https://example.com/photos/jose1.jpg', 'Foto entrenamiento'),
(6, 'https://example.com/photos/maria1.jpg', 'Foto oficial 2023'),
(7, 'https://example.com/photos/luis1.jpg', 'Foto entrenamiento'),
(8, 'https://example.com/photos/sofia1.jpg', 'Foto oficial 2022'),
(9, 'https://example.com/photos/juan1.jpg', 'Foto entrenamiento'),
(10, 'https://example.com/photos/isabel1.jpg', 'Foto oficial 2023');

-- Insertar Lesiones
INSERT INTO lesiones (jugador_id, fecha_inicio, fecha_fin, tipo, descripcion, estado) VALUES
(2, '2023-01-10', NULL, 'Desgarro muscular', 'Lesión en el muslo izquierdo', 'activa'),
(5, '2022-12-01', '2023-02-01', 'Esguince', 'Lesión en el tobillo derecho', 'recuperado'),
(7, '2023-03-05', NULL, 'Fractura', 'Fractura en la mano derecha', 'activa'),
(1, '2022-11-20', '2023-01-20', 'Distensión', 'Lesión leve en la espalda', 'recuperado'),
(9, '2023-02-15', NULL, 'Contractura', 'Contractura muscular', 'activa'),
(3, '2023-01-01', '2023-01-15', 'Lesión menor', 'Dolor muscular leve', 'recuperado'),
(6, '2022-10-10', '2022-12-10', 'Lesión crónica', 'Dolor recurrente en el hombro', 'crónica'),
(8, '2023-02-20', NULL, 'Lesión menor', 'Dolor en la rodilla', 'activa'),
(4, '2023-03-01', NULL, 'Desgarro', 'Desgarro muscular en pierna', 'activa'),
(10, '2023-01-05', '2023-02-05', 'Esguince', 'Esguince en muñeca', 'recuperado');

-- Insertar Ranking Equipos Torneo
INSERT INTO ranking_equipos_torneo (torneo_id, equipo_id, division_id, puntos, partidos_ganados, partidos_perdidos, partidos_empatados) VALUES
(1, 1, 1, 15, 5, 1, 0),
(1, 2, 1, 12, 4, 2, 0),
(1, 3, 2, 10, 3, 3, 0),
(1, 4, 2, 8, 2, 4, 0),
(1, 5, 3, 14, 5, 1, 0),
(1, 6, 3, 11, 3, 3, 0),
(1, 7, 4, 9, 3, 2, 1),
(1, 8, 4, 7, 2, 4, 0),
(1, 9, 5, 13, 4, 1, 1),
(1, 10, 5, 6, 1, 5, 0);
