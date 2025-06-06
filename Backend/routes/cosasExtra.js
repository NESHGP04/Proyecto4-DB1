const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Vista jugadores_stats
router.get("/views/jugadores_stats", async (req, res) => {
  try {
    const jugadoresStats = await prisma.$queryRaw`
      SELECT *
      FROM view_jugadores_stats
    `;
    res.json(jugadoresStats);
  } catch (err) {
    console.error("Error al consultar view_jugadores_stats:", err);
    res.status(500).json({ error: "No se pudo obtener view_jugadores_stats" });
  }
});

// Vista equipos_ranking
router.get("/views/equipos_ranking", async (req, res) => {
  try {
    const equiposRanking = await prisma.$queryRaw`
      SELECT *
      FROM view_equipos_ranking
    `;
    res.json(equiposRanking);
  } catch (err) {
    console.error("Error al consultar view_equipos_ranking:", err);
    res.status(500).json({ error: "No se pudo obtener view_equipos_ranking" });
  }
});

// Vista partidos_detalles
router.get("/views/partidos_detalles", async (req, res) => {
  try {
    const partidosDetalles = await prisma.$queryRaw`
      SELECT *
      FROM view_partidos_detalles
    `;
    res.json(partidosDetalles);
  } catch (err) {
    console.error("Error al consultar view_partidos_detalles:", err);
    res
      .status(500)
      .json({ error: "No se pudo obtener view_partidos_detalles" });
  }
});

// Bitácora
router.get("/bitacora", async (req, res) => {
  try {
    const registros = await prisma.bitacora.findMany({
      orderBy: { fecha_hora: "desc" },
    });
    res.json(registros);
  } catch (err) {
    console.error("Error al obtener Bitacora:", err);
    res.status(500).json({ error: "Error al obtener Bitacora" });
  }
});

// Auditoría equipos
router.get("/auditoria/equipos", async (req, res) => {
  try {
    const registros = await prisma.auditoria_equipos.findMany({
      orderBy: { fecha: "desc" },
    });
    res.json(registros);
  } catch (err) {
    console.error("Error al obtener auditoria_equipos:", err);
    res.status(500).json({ error: "Error al obtener auditoria_equipos" });
  }
});

// Auditoría jugadores
router.get("/auditoria/jugadores", async (req, res) => {
  try {
    const registros = await prisma.auditoria_jugadores.findMany({
      orderBy: { fecha: "desc" },
    });
    res.json(registros);
  } catch (err) {
    console.error("Error al obtener auditoria_jugadores:", err);
    res.status(500).json({ error: "Error al obtener auditoria_jugadores" });
  }
});

module.exports = router;
