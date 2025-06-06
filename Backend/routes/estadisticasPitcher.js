const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todas las estadísticas de pitcher
router.get("/", async (req, res) => {
  try {
    const estadisticas = await prisma.estadisticas_pitcher.findMany({
      include: { jugadores: true, partidos: true },
    });
    res.json(estadisticas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estadísticas de pitcher" });
  }
});

//  Obtener estadística de pitcher por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const estadistica = await prisma.estadisticas_pitcher.findUnique({
      where: { id: parseInt(id) },
      include: { jugadores: true, partidos: true },
    });
    if (!estadistica) {
      return res.status(404).json({ error: "Estadística no encontrada" });
    }
    res.json(estadistica);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estadística" });
  }
});

//  Crear una nueva estadística de pitcher
router.post("/", async (req, res) => {
  const {
    partido_id,
    jugador_id,
    innings_lanzados,
    ponches,
    carreras_permitidas,
    bases_por_bola,
    hits_permitidos,
  } = req.body;

  // Validar que todos los campos estén presentes
  if (
    partido_id === undefined ||
    jugador_id === undefined ||
    innings_lanzados === undefined ||
    ponches === undefined ||
    carreras_permitidas === undefined ||
    bases_por_bola === undefined ||
    hits_permitidos === undefined
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar que el partido exista
    const partido = await prisma.partidos.findUnique({
      where: { id: parseInt(partido_id) },
    });
    if (!partido) {
      return res.status(404).json({ error: "El partido no existe" });
    }
    // Verificar que el jugador exista
    const jugador = await prisma.jugadores.findUnique({
      where: { id: parseInt(jugador_id) },
    });
    if (!jugador) {
      return res.status(404).json({ error: "El jugador no existe" });
    }
    const nuevaEstadistica = await prisma.estadisticas_pitcher.create({
      data: {
        partido_id: parseInt(partido_id),
        jugador_id: parseInt(jugador_id),
        innings_lanzados: parseFloat(innings_lanzados),
        ponches: parseInt(ponches),
        carreras_permitidas: parseInt(carreras_permitidas),
        bases_por_bola: parseInt(bases_por_bola),
        hits_permitidos: parseInt(hits_permitidos),
      },
    });
    res.status(201).json(nuevaEstadistica);
  } catch (error) {
    res.status(400).json({ error: "Error al crear estadística de pitcher" });
  }
});

// Actualizar estadística de pitcher por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    partido_id,
    jugador_id,
    innings_lanzados,
    ponches,
    carreras_permitidas,
    bases_por_bola,
    hits_permitidos,
  } = req.body;

  // Validar que todos los campos estén presentes
  if (
    partido_id === undefined ||
    jugador_id === undefined ||
    innings_lanzados === undefined ||
    ponches === undefined ||
    carreras_permitidas === undefined ||
    bases_por_bola === undefined ||
    hits_permitidos === undefined
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar que el partido exista
    const partido = await prisma.partidos.findUnique({
      where: { id: parseInt(partido_id) },
    });
    if (!partido) {
      return res.status(404).json({ error: "El partido no existe" });
    }
    // Verificar que el jugador exista
    const jugador = await prisma.jugadores.findUnique({
      where: { id: parseInt(jugador_id) },
    });
    if (!jugador) {
      return res.status(404).json({ error: "El jugador no existe" });
    }
    const estadisticaActualizada = await prisma.estadisticas_pitcher.update({
      where: { id: parseInt(id) },
      data: {
        partido_id: parseInt(partido_id),
        jugador_id: parseInt(jugador_id),
        innings_lanzados: parseFloat(innings_lanzados),
        ponches: parseInt(ponches),
        carreras_permitidas: parseInt(carreras_permitidas),
        bases_por_bola: parseInt(bases_por_bola),
        hits_permitidos: parseInt(hits_permitidos),
      },
    });
    res.json(estadisticaActualizada);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al actualizar estadística de pitcher" });
  }
});

// DELETE: Eliminar estadística de pitcher por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.estadisticas_pitcher.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Estadística eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar estadística" });
  }
});

module.exports = router;
