const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

//Funcionamiento API
app.get("/", (req, res) => {
  res.send("API de Liga de Softbol funcionando");
});

// Middlewares
app.use(cors());
app.use(express.json());

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

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor API en http://localhost:${PORT}`);
});
