-- CreateEnum
CREATE TYPE "estado_lesion_enum" AS ENUM ('activa', 'recuperado', 'crónica');

-- CreateEnum
CREATE TYPE "genero_enum" AS ENUM ('M', 'F', 'O');

-- CreateEnum
CREATE TYPE "posicion_enum" AS ENUM ('pitcher', 'catcher', 'primera_base', 'segunda_base', 'tercera_base', 'shortstop', 'jardinero_izquierdo', 'jardinero_central', 'jardinero_derecho', 'designado');

-- CreateEnum
CREATE TYPE "resultado_partido_enum" AS ENUM ('ganado', 'perdido', 'empate', 'pendiente');

-- CreateEnum
CREATE TYPE "rol_entrenador_enum" AS ENUM ('principal', 'asistente', 'preparador físico', 'analista');

-- CreateEnum
CREATE TYPE "tipo_estadistica_enum" AS ENUM ('bateo', 'pitcheo', 'defensa');

-- CreateTable
CREATE TABLE "arbitraje" (
    "id" SERIAL NOT NULL,
    "partido_id" INTEGER NOT NULL,
    "arbitro_id" INTEGER NOT NULL,
    "rol" VARCHAR(50) NOT NULL,

    CONSTRAINT "arbitraje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arbitros" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "nivel" VARCHAR(50),
    "correo" VARCHAR(150),

    CONSTRAINT "arbitros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendario" (
    "id" SERIAL NOT NULL,
    "temporada_id" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "calendario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "division" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "division_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "entrenadores" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "rol" "rol_entrenador_enum" NOT NULL,
    "equipo_id" INTEGER NOT NULL,
    "fecha_ingreso" DATE NOT NULL DEFAULT CURRENT_DATE,
    "correo" VARCHAR(150),

    CONSTRAINT "entrenadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "ciudad" VARCHAR(100),
    "fecha_creacion" DATE,
    "division_id" INTEGER NOT NULL,

    CONSTRAINT "equipos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estadios" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "ubicacion" VARCHAR(150),
    "capacidad" INTEGER,

    CONSTRAINT "estadios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estadisticas_jugador" (
    "id" SERIAL NOT NULL,
    "jugador_id" INTEGER NOT NULL,
    "temporada_id" INTEGER NOT NULL,
    "partidos_jugados" INTEGER DEFAULT 0,
    "promedio_bateo" DECIMAL(4,3) DEFAULT 0.000,
    "homeruns" INTEGER DEFAULT 0,
    "carreras_anotadas" INTEGER DEFAULT 0,

    CONSTRAINT "estadisticas_jugador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estadisticas_partido" (
    "id" SERIAL NOT NULL,
    "partido_id" INTEGER NOT NULL,
    "jugador_id" INTEGER NOT NULL,
    "hits" INTEGER DEFAULT 0,
    "carreras" INTEGER DEFAULT 0,
    "bases" INTEGER DEFAULT 0,
    "errores" INTEGER DEFAULT 0,
    "strikeouts" INTEGER DEFAULT 0,
    "innings_lanzados" DECIMAL(4,2) DEFAULT 0,
    "carreras_permitidas" INTEGER DEFAULT 0,
    "ponches" INTEGER DEFAULT 0,
    "bases_por_bola" INTEGER DEFAULT 0,
    "fecha_registro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "estadisticas_partido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estadisticas_pitcher" (
    "id" SERIAL NOT NULL,
    "partido_id" INTEGER NOT NULL,
    "jugador_id" INTEGER NOT NULL,
    "innings_lanzados" DECIMAL(4,2) NOT NULL DEFAULT 0,
    "ponches" INTEGER DEFAULT 0,
    "carreras_permitidas" INTEGER DEFAULT 0,
    "bases_por_bola" INTEGER DEFAULT 0,
    "hits_permitidos" INTEGER DEFAULT 0,

    CONSTRAINT "estadisticas_pitcher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fotos_jugadores" (
    "id" SERIAL NOT NULL,
    "jugador_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "descripcion" TEXT,
    "fecha_subida" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fotos_jugadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jugadores" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "apellido" VARCHAR(100) NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "genero" "genero_enum" NOT NULL,
    "equipo_id" INTEGER NOT NULL,
    "fecha_ingreso" DATE NOT NULL DEFAULT CURRENT_DATE,
    "nacionalidad" VARCHAR(50),

    CONSTRAINT "jugadores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jugadores_posicion" (
    "jugador_id" INTEGER NOT NULL,
    "posicion_id" INTEGER NOT NULL,
    "temporada_id" INTEGER NOT NULL,

    CONSTRAINT "jugadores_posicion_pkey" PRIMARY KEY ("jugador_id","posicion_id","temporada_id")
);

-- CreateTable
CREATE TABLE "lesiones" (
    "id" SERIAL NOT NULL,
    "jugador_id" INTEGER NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE,
    "tipo" VARCHAR(100),
    "descripcion" TEXT,
    "estado" "estado_lesion_enum" NOT NULL DEFAULT 'activa',

    CONSTRAINT "lesiones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "partidos" (
    "id" SERIAL NOT NULL,
    "torneo_id" INTEGER NOT NULL,
    "equipo_local_id" INTEGER NOT NULL,
    "equipo_visitante_id" INTEGER NOT NULL,
    "fecha_hora" TIMESTAMP(6) NOT NULL,
    "resultado" "resultado_partido_enum" DEFAULT 'pendiente',
    "score_local" INTEGER DEFAULT 0,
    "score_visitante" INTEGER DEFAULT 0,
    "estadio_id" INTEGER NOT NULL,

    CONSTRAINT "partidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posiciones" (
    "id" SERIAL NOT NULL,
    "nombre" "posicion_enum" NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "posiciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ranking_equipos_torneo" (
    "id" SERIAL NOT NULL,
    "torneo_id" INTEGER NOT NULL,
    "equipo_id" INTEGER NOT NULL,
    "division_id" INTEGER NOT NULL,
    "puntos" INTEGER DEFAULT 0,
    "partidos_ganados" INTEGER DEFAULT 0,
    "partidos_perdidos" INTEGER DEFAULT 0,
    "partidos_empatados" INTEGER DEFAULT 0,

    CONSTRAINT "ranking_equipos_torneo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sanciones" (
    "id" SERIAL NOT NULL,
    "jugador_id" INTEGER,
    "equipo_id" INTEGER,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE,
    "motivo" TEXT NOT NULL,
    "tipo_sancion" VARCHAR(50) NOT NULL,
    "creado_en" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sanciones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "temporadas" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE NOT NULL,

    CONSTRAINT "temporadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "torneos" (
    "id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "temporada" VARCHAR(50),
    "division_id" INTEGER NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE NOT NULL,
    "estado" VARCHAR(20) NOT NULL DEFAULT 'activo',

    CONSTRAINT "torneos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "arbitraje_partido_id_arbitro_id_key" ON "arbitraje"("partido_id", "arbitro_id");

-- CreateIndex
CREATE UNIQUE INDEX "arbitros_correo_key" ON "arbitros"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "division_nombre_key" ON "division"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "entrenadores_correo_key" ON "entrenadores"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "equipos_nombre_key" ON "equipos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "estadios_nombre_key" ON "estadios"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "estadisticas_partido_partido_id_jugador_id_key" ON "estadisticas_partido"("partido_id", "jugador_id");

-- CreateIndex
CREATE UNIQUE INDEX "estadisticas_pitcher_partido_id_jugador_id_key" ON "estadisticas_pitcher"("partido_id", "jugador_id");

-- CreateIndex
CREATE UNIQUE INDEX "jugadores_nombre_apellido_fecha_nacimiento_key" ON "jugadores"("nombre", "apellido", "fecha_nacimiento");

-- CreateIndex
CREATE UNIQUE INDEX "posiciones_nombre_key" ON "posiciones"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "ranking_equipos_torneo_torneo_id_equipo_id_key" ON "ranking_equipos_torneo"("torneo_id", "equipo_id");

-- CreateIndex
CREATE UNIQUE INDEX "temporadas_nombre_key" ON "temporadas"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "torneos_nombre_key" ON "torneos"("nombre");

-- AddForeignKey
ALTER TABLE "arbitraje" ADD CONSTRAINT "arbitraje_arbitro_id_fkey" FOREIGN KEY ("arbitro_id") REFERENCES "arbitros"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "arbitraje" ADD CONSTRAINT "arbitraje_partido_id_fkey" FOREIGN KEY ("partido_id") REFERENCES "partidos"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "calendario" ADD CONSTRAINT "calendario_temporada_id_fkey" FOREIGN KEY ("temporada_id") REFERENCES "temporadas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "entrenadores" ADD CONSTRAINT "entrenadores_equipo_id_fkey" FOREIGN KEY ("equipo_id") REFERENCES "equipos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipos" ADD CONSTRAINT "equipos_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "division"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "estadisticas_jugador" ADD CONSTRAINT "estadisticas_jugador_jugador_id_fkey" FOREIGN KEY ("jugador_id") REFERENCES "jugadores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "estadisticas_jugador" ADD CONSTRAINT "estadisticas_jugador_temporada_id_fkey" FOREIGN KEY ("temporada_id") REFERENCES "temporadas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "estadisticas_partido" ADD CONSTRAINT "estadisticas_partido_jugador_id_fkey" FOREIGN KEY ("jugador_id") REFERENCES "jugadores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "estadisticas_partido" ADD CONSTRAINT "estadisticas_partido_partido_id_fkey" FOREIGN KEY ("partido_id") REFERENCES "partidos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "estadisticas_pitcher" ADD CONSTRAINT "estadisticas_pitcher_jugador_id_fkey" FOREIGN KEY ("jugador_id") REFERENCES "jugadores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "estadisticas_pitcher" ADD CONSTRAINT "estadisticas_pitcher_partido_id_fkey" FOREIGN KEY ("partido_id") REFERENCES "partidos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fotos_jugadores" ADD CONSTRAINT "fotos_jugadores_jugador_id_fkey" FOREIGN KEY ("jugador_id") REFERENCES "jugadores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jugadores" ADD CONSTRAINT "jugadores_equipo_id_fkey" FOREIGN KEY ("equipo_id") REFERENCES "equipos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jugadores_posicion" ADD CONSTRAINT "jugadores_posicion_jugador_id_fkey" FOREIGN KEY ("jugador_id") REFERENCES "jugadores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jugadores_posicion" ADD CONSTRAINT "jugadores_posicion_posicion_id_fkey" FOREIGN KEY ("posicion_id") REFERENCES "posiciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jugadores_posicion" ADD CONSTRAINT "jugadores_posicion_temporada_id_fkey" FOREIGN KEY ("temporada_id") REFERENCES "temporadas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lesiones" ADD CONSTRAINT "lesiones_jugador_id_fkey" FOREIGN KEY ("jugador_id") REFERENCES "jugadores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partidos" ADD CONSTRAINT "partidos_equipo_local_id_fkey" FOREIGN KEY ("equipo_local_id") REFERENCES "equipos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partidos" ADD CONSTRAINT "partidos_equipo_visitante_id_fkey" FOREIGN KEY ("equipo_visitante_id") REFERENCES "equipos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partidos" ADD CONSTRAINT "partidos_estadio_id_fkey" FOREIGN KEY ("estadio_id") REFERENCES "estadios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "partidos" ADD CONSTRAINT "partidos_torneo_id_fkey" FOREIGN KEY ("torneo_id") REFERENCES "torneos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ranking_equipos_torneo" ADD CONSTRAINT "ranking_equipos_torneo_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "division"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ranking_equipos_torneo" ADD CONSTRAINT "ranking_equipos_torneo_equipo_id_fkey" FOREIGN KEY ("equipo_id") REFERENCES "equipos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ranking_equipos_torneo" ADD CONSTRAINT "ranking_equipos_torneo_torneo_id_fkey" FOREIGN KEY ("torneo_id") REFERENCES "torneos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sanciones" ADD CONSTRAINT "sanciones_equipo_id_fkey" FOREIGN KEY ("equipo_id") REFERENCES "equipos"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "sanciones" ADD CONSTRAINT "sanciones_jugador_id_fkey" FOREIGN KEY ("jugador_id") REFERENCES "jugadores"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "torneos" ADD CONSTRAINT "torneos_division_id_fkey" FOREIGN KEY ("division_id") REFERENCES "division"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
