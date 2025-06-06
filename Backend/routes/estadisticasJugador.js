const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  Obtener todas las estadísticas de jugador
router.get("/", async (req, res) => {
  try {
    const estadisticas = await prisma.estadisticas_jugador.findMany({
      include: { jugadores: true, temporadas: true },
    });
    res.json(estadisticas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estadísticas de jugador" });
  }
});

//  Obtener estadística de jugador por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const estadistica = await prisma.estadisticas_jugador.findUnique({
      where: { id: parseInt(id) },
      include: { jugadores: true, temporadas: true },
    });
    if (!estadistica) {
      return res.status(404).json({ error: "Estadística no encontrada" });
    }
    res.json(estadistica);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estadística" });
  }
});

//  Crear una nueva estadística de jugador
router.post("/", async (req, res) => {
  const {
    jugador_id,
    temporada_id,
    partidos_jugados,
    promedio_bateo,
    homeruns,
    carreras_anotadas,
  } = req.body;

  // Validar que todos los campos estén presentes
  if (
    jugador_id === undefined ||
    temporada_id === undefined ||
    partidos_jugados === undefined ||
    promedio_bateo === undefined ||
    homeruns === undefined ||
    carreras_anotadas === undefined
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar que el jugador exista
    const jugador = await prisma.jugadores.findUnique({
      where: { id: parseInt(jugador_id) },
    });
    if (!jugador) {
      return res.status(404).json({ error: "El jugador no existe" });
    }
    // Verificar que la temporada exista
    const temporada = await prisma.temporadas.findUnique({
      where: { id: parseInt(temporada_id) },
    });
    if (!temporada) {
      return res.status(404).json({ error: "La temporada no existe" });
    }
    const nuevaEstadistica = await prisma.estadisticas_jugador.create({
      data: {
        jugador_id: parseInt(jugador_id),
        temporada_id: parseInt(temporada_id),
        partidos_jugados: parseInt(partidos_jugados),
        promedio_bateo: parseFloat(promedio_bateo),
        homeruns: parseInt(homeruns),
        carreras_anotadas: parseInt(carreras_anotadas),
      },
    });
    res.status(201).json(nuevaEstadistica);
  } catch (error) {
    res.status(400).json({ error: "Error al crear estadística de jugador" });
  }
});

//  Actualizar estadística de jugador por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    jugador_id,
    temporada_id,
    partidos_jugados,
    promedio_bateo,
    homeruns,
    carreras_anotadas,
  } = req.body;
  try {
    // Si se quiere actualizar el jugador o la temporada, verificar que existan
    if (jugador_id) {
      const jugador = await prisma.jugadores.findUnique({
        where: { id: parseInt(jugador_id) },
      });
      if (!jugador) {
        return res.status(404).json({ error: "El jugador no existe" });
      }
    }
    if (temporada_id) {
      const temporada = await prisma.temporadas.findUnique({
        where: { id: parseInt(temporada_id) },
      });
      if (!temporada) {
        return res.status(404).json({ error: "La temporada no existe" });
      }
    }
    const estadisticaActualizada = await prisma.estadisticas_jugador.update({
      where: { id: parseInt(id) },
      data: {
        jugador_id: jugador_id ? parseInt(jugador_id) : undefined,
        temporada_id: temporada_id ? parseInt(temporada_id) : undefined,
        partidos_jugados: partidos_jugados
          ? parseInt(partidos_jugados)
          : undefined,
        promedio_bateo: promedio_bateo ? parseFloat(promedio_bateo) : undefined,
        homeruns: homeruns ? parseInt(homeruns) : undefined,
        carreras_anotadas: carreras_anotadas
          ? parseInt(carreras_anotadas)
          : undefined,
      },
    });
    res.json(estadisticaActualizada);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al actualizar estadística de jugador" });
  }
});

//Eliminar estadística de jugador por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.estadisticas_jugador.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Estadística eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar estadística" });
  }
});

module.exports = router;
