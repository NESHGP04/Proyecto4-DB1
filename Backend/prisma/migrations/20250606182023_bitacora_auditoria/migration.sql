/*
  Warnings:

  - You are about to drop the column `temporada` on the `torneos` table. All the data in the column will be lost.
  - Added the required column `temporada_id` to the `torneos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OperacionEnum" AS ENUM ('CREATE', 'UPDATE', 'DELETE');

-- CreateEnum
CREATE TYPE "TablaEnum" AS ENUM ('arbitros', 'arbitraje', 'calendario', 'division', 'entrenadores', 'equipos', 'estadios', 'estadisticas_jugador', 'estadisticas_partido', 'estadisticas_pitcher', 'fotos_jugadores', 'jugadores', 'jugadores_posicion', 'lesiones', 'partidos', 'posiciones', 'ranking_equipos_torneo', 'sanciones', 'temporadas', 'torneos');

-- AlterTable
ALTER TABLE "torneos" DROP COLUMN "temporada",
ADD COLUMN     "temporada_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Bitacora" (
    "id" SERIAL NOT NULL,
    "fecha_hora" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tabla_afectada" "TablaEnum" NOT NULL,
    "operacion" "OperacionEnum" NOT NULL,
    "registro_id" INTEGER,
    "usuario_id" INTEGER,
    "detalles" JSONB,

    CONSTRAINT "Bitacora_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoria_equipos" (
    "id" SERIAL NOT NULL,
    "id_equipo" INTEGER,
    "operacion" "OperacionEnum" NOT NULL,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auditoria_equipos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoria_jugadores" (
    "id" SERIAL NOT NULL,
    "id_jugador" INTEGER,
    "operacion" "OperacionEnum" NOT NULL,
    "fecha" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auditoria_jugadores_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Bitacora_fecha_hora_idx" ON "Bitacora"("fecha_hora");

-- CreateIndex
CREATE INDEX "Bitacora_tabla_afectada_operacion_idx" ON "Bitacora"("tabla_afectada", "operacion");

-- CreateIndex
CREATE INDEX "auditoria_equipos_id_equipo_idx" ON "auditoria_equipos"("id_equipo");

-- CreateIndex
CREATE INDEX "auditoria_jugadores_id_jugador_idx" ON "auditoria_jugadores"("id_jugador");

-- AddForeignKey
ALTER TABLE "torneos" ADD CONSTRAINT "torneos_temporada_id_fkey" FOREIGN KEY ("temporada_id") REFERENCES "temporadas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auditoria_equipos" ADD CONSTRAINT "auditoria_equipos_id_equipo_fkey" FOREIGN KEY ("id_equipo") REFERENCES "equipos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "auditoria_jugadores" ADD CONSTRAINT "auditoria_jugadores_id_jugador_fkey" FOREIGN KEY ("id_jugador") REFERENCES "jugadores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;


--------------------Trigger Functions--------------------

-- Trigger Auditoria equipos
CREATE OR REPLACE FUNCTION fn_auditoria_equipos()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO auditoria_equipos (id_equipo, operacion, fecha)
    VALUES (NEW.id, 'CREATE', NOW());
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO auditoria_equipos (id_equipo, operacion, fecha)
    VALUES (NEW.id, 'UPDATE', NOW());
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO auditoria_equipos (id_equipo, operacion, fecha)
    VALUES (OLD.id, 'DELETE', NOW());
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_auditoria_equipos
AFTER INSERT OR UPDATE OR DELETE
ON equipos
FOR EACH ROW
EXECUTE FUNCTION fn_auditoria_equipos();


-- Trigger Auditoria jugadores
CREATE OR REPLACE FUNCTION fn_auditoria_jugadores()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO auditoria_jugadores (id_jugador, operacion, fecha)
    VALUES (NEW.id, 'CREATE', NOW());
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO auditoria_jugadores (id_jugador, operacion, fecha)
    VALUES (NEW.id, 'UPDATE', NOW());
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO auditoria_jugadores (id_jugador, operacion, fecha)
    VALUES (OLD.id, 'DELETE', NOW());
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_auditoria_jugadores
AFTER INSERT OR UPDATE OR DELETE
ON jugadores
FOR EACH ROW
EXECUTE FUNCTION fn_auditoria_jugadores();



---Trigger para Bitacora 
CREATE OR REPLACE FUNCTION fn_bitacora_general()
RETURNS TRIGGER AS $$
DECLARE
  v_registro_id INT;
BEGIN
  IF TG_OP = 'INSERT' THEN
    v_registro_id := NEW.id;
    INSERT INTO "Bitacora"(tabla_afectada, operacion, registro_id, fecha_hora)
    VALUES (TG_TABLE_NAME::"TablaEnum", 'CREATE', v_registro_id, NOW());
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    v_registro_id := NEW.id;
    INSERT INTO "Bitacora"(tabla_afectada, operacion, registro_id, fecha_hora)
    VALUES (TG_TABLE_NAME::"TablaEnum", 'UPDATE', v_registro_id, NOW());
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    v_registro_id := OLD.id;
    INSERT INTO "Bitacora"(tabla_afectada, operacion, registro_id, fecha_hora)
    VALUES (TG_TABLE_NAME::"TablaEnum", 'DELETE', v_registro_id, NOW());
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION fn_bitacora_jugadores_posicion()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO "Bitacora"(tabla_afectada, operacion, fecha_hora)
    VALUES ('jugadores_posicion', 'CREATE', NOW());
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO "Bitacora"(tabla_afectada, operacion, fecha_hora)
    VALUES ('jugadores_posicion', 'UPDATE', NOW());
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    INSERT INTO "Bitacora"(tabla_afectada, operacion, fecha_hora)
    VALUES ('jugadores_posicion', 'DELETE', NOW());
    RETURN OLD;
  END IF;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER trg_bitacora_arbitros
AFTER INSERT OR UPDATE OR DELETE
ON arbitros
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_arbitraje
AFTER INSERT OR UPDATE OR DELETE
ON arbitraje
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_calendario
AFTER INSERT OR UPDATE OR DELETE
ON calendario
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_division
AFTER INSERT OR UPDATE OR DELETE
ON division
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_entrenadores
AFTER INSERT OR UPDATE OR DELETE
ON entrenadores
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_equipos
AFTER INSERT OR UPDATE OR DELETE
ON equipos
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_estadios
AFTER INSERT OR UPDATE OR DELETE
ON estadios
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_estadisticas_jugador
AFTER INSERT OR UPDATE OR DELETE
ON estadisticas_jugador
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_estadisticas_partido
AFTER INSERT OR UPDATE OR DELETE
ON estadisticas_partido
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_estadisticas_pitcher
AFTER INSERT OR UPDATE OR DELETE
ON estadisticas_pitcher
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_fotos_jugadores
AFTER INSERT OR UPDATE OR DELETE
ON fotos_jugadores
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_jugadores
AFTER INSERT OR UPDATE OR DELETE
ON jugadores
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_lesiones
AFTER INSERT OR UPDATE OR DELETE
ON lesiones
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_partidos
AFTER INSERT OR UPDATE OR DELETE
ON partidos
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_posiciones
AFTER INSERT OR UPDATE OR DELETE
ON posiciones
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_ranking_equipos_torneo
AFTER INSERT OR UPDATE OR DELETE
ON ranking_equipos_torneo
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_sanciones
AFTER INSERT OR UPDATE OR DELETE
ON sanciones
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_temporadas
AFTER INSERT OR UPDATE OR DELETE
ON temporadas
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_torneos
AFTER INSERT OR UPDATE OR DELETE
ON torneos
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_general();

CREATE TRIGGER trg_bitacora_jugadores_posicion
AFTER INSERT OR UPDATE OR DELETE
ON jugadores_posicion
FOR EACH ROW
EXECUTE FUNCTION fn_bitacora_jugadores_posicion();


--  Vista de estadísticas de jugadores por temporada
CREATE VIEW view_jugadores_stats AS
SELECT
  j.id                  AS jugador_id,
  j.nombre              AS nombre_jugador,
  j.apellido            AS apellido_jugador,
  tj.id                  AS temporada_id,
  tj.nombre             AS nombre_temporada,
  ej.partidos_jugados   AS partidos_jugados,
  ej.promedio_bateo     AS promedio_bateo,
  ej.homeruns           AS homeruns,
  ej.carreras_anotadas  AS carreras_anotadas
FROM jugadores AS j
JOIN estadisticas_jugador AS ej
  ON j.id = ej.jugador_id
JOIN temporadas AS tj
  ON ej.temporada_id = tj.id;

-- Vista de ranking de equipos por torneo
CREATE VIEW view_equipos_ranking AS
SELECT
  re.torneo_id              AS torneo_id,
  t.nombre                  AS nombre_torneo,
  re.equipo_id              AS equipo_id,
  e.nombre                  AS nombre_equipo,
  re.division_id            AS division_id,
  d.nombre                  AS nombre_division,
  re.puntos                 AS puntos,
  re.partidos_ganados       AS partidos_ganados,
  re.partidos_perdidos      AS partidos_perdidos,
  re.partidos_empatados     AS partidos_empatados
FROM ranking_equipos_torneo AS re
JOIN torneos AS t
  ON re.torneo_id = t.id
JOIN equipos AS e
  ON re.equipo_id = e.id
JOIN division AS d
  ON re.division_id = d.id;

-- Vista de detalles de cada partido
CREATE VIEW view_partidos_detalles AS
SELECT
  p.id                       AS partido_id,
  p.fecha_hora               AS fecha_hora,
  el.id                      AS equipo_local_id,
  el.nombre                  AS nombre_equipo_local,
  ev.id                      AS equipo_visitante_id,
  ev.nombre                  AS nombre_equipo_visitante,
  p.score_local              AS score_local,
  p.score_visitante          AS score_visitante,
  p.resultado                AS resultado_partido,
  s.id                       AS estadio_id,
  s.nombre                   AS nombre_estadio
FROM partidos AS p
JOIN equipos AS el
  ON p.equipo_local_id = el.id
JOIN equipos AS ev
  ON p.equipo_visitante_id = ev.id
JOIN estadios AS s
  ON p.estadio_id = s.id;
