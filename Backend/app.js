const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());

//Funcionamiento API
app.get("/", (req, res) => {
  res.send("API de Liga de Softbol funcionando");
});

// Rutas
const arbitrajeRouter = require("./routes/arbitraje");
app.use("/api/arbitraje", arbitrajeRouter);

const arbitrosRuter = require("./routes/arbitros");
app.use("/api/arbitros", arbitrosRuter);

const calendarioRouter = require("./routes/calendarios");
app.use("/api/calendario", calendarioRouter);

const divisionRouter = require("./routes/divisiones");
app.use("/api/division", divisionRouter);

const entrenadorRouter = require("./routes/entrenadores");
app.use("/api/entrenador", entrenadorRouter);

const equiposRouter = require("./routes/equipos");
app.use("/api/equipos", equiposRouter);

const estadiosRouter = require("./routes/estadios");
app.use("/api/estadios", estadiosRouter);

const estadisticasJugadorRouter = require("./routes/estadisticasJugador");
app.use("/api/estadisticas_jugador", estadisticasJugadorRouter);

const estadisticasPartidoRouter = require("./routes/estadisticasPartido");
app.use("/api/estadisticas_partido", estadisticasPartidoRouter);

const estadisticasPitcherRouter = require("./routes/estadisticasPitcher");
app.use("/api/estadisticas_pitcher", estadisticasPitcherRouter);

const fotosJugadoresRouter = require("./routes/fotosJugadores");
app.use("/api/fotos_jugadores", fotosJugadoresRouter);

const jugadoresRouter = require("./routes/jugadores");
app.use("/api/jugadores", jugadoresRouter);

const jugadoresPosicionRouter = require("./routes/jugadoresPosicion");
app.use("/api/jugadores_posicion", jugadoresPosicionRouter);

const lesionesRouter = require("./routes/lesiones");
app.use("/api/lesiones", lesionesRouter);

const partidosRouter = require("./routes/partidos");
app.use("/api/partidos", partidosRouter);

const posicionesRouter = require("./routes/posiciones");
app.use("/api/posiciones", posicionesRouter);

const rankingEquiposTorneoRouter = require("./routes/rankingEquiposTorneo");
app.use("/api/ranking_equipos_torneo", rankingEquiposTorneoRouter);

const sancionesRouter = require("./routes/sanciones");
app.use("/api/sanciones", sancionesRouter);

const temporadasRouter = require("./routes/temporadas");
app.use("/api/temporadas", temporadasRouter);

const torneosRouter = require("./routes/torneos");
app.use("/api/torneos", torneosRouter);

const cosasExtraRouter = require("./routes/cosasExtra");
app.use("/api/cosas_extra", cosasExtraRouter);

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor API en http://localhost:${PORT}`);
});
