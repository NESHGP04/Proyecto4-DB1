const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  Obtener todas las estadísticas de partido
router.get("/", async (req, res) => {
  try {
    const estadisticas = await prisma.estadisticas_partido.findMany({
      include: { jugadores: true, partidos: true },
    });
    res.json(estadisticas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estadísticas de partido" });
  }
});

//  Obtener estadística de partido por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const estadistica = await prisma.estadisticas_partido.findUnique({
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

// Crear una nueva estadística de partido (todos los campos obligatorios)
router.post("/", async (req, res) => {
  const {
    partido_id,
    jugador_id,
    hits,
    carreras,
    bases,
    errores,
    strikeouts,
    innings_lanzados,
    carreras_permitidas,
    ponches,
    bases_por_bola,
    fecha_registro,
  } = req.body;

  // Validar que todos los campos estén presentes
  if (
    partido_id === undefined ||
    jugador_id === undefined ||
    hits === undefined ||
    carreras === undefined ||
    bases === undefined ||
    errores === undefined ||
    strikeouts === undefined ||
    innings_lanzados === undefined ||
    carreras_permitidas === undefined ||
    ponches === undefined ||
    bases_por_bola === undefined ||
    fecha_registro === undefined
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
    const nuevaEstadistica = await prisma.estadisticas_partido.create({
      data: {
        partido_id: parseInt(partido_id),
        jugador_id: parseInt(jugador_id),
        hits: parseInt(hits),
        carreras: parseInt(carreras),
        bases: parseInt(bases),
        errores: parseInt(errores),
        strikeouts: parseInt(strikeouts),
        innings_lanzados: parseFloat(innings_lanzados),
        carreras_permitidas: parseInt(carreras_permitidas),
        ponches: parseInt(ponches),
        bases_por_bola: parseInt(bases_por_bola),
        fecha_registro: new Date(fecha_registro),
      },
    });
    res.status(201).json(nuevaEstadistica);
  } catch (error) {
    res.status(400).json({ error: "Error al crear estadística de partido" });
  }
});

// PUT: Actualizar estadística de partido por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    partido_id,
    jugador_id,
    hits,
    carreras,
    bases,
    errores,
    strikeouts,
    innings_lanzados,
    carreras_permitidas,
    ponches,
    bases_por_bola,
    fecha_registro,
  } = req.body;
  try {
    // Si se quiere actualizar el partido o jugador, verificar que existan
    if (partido_id) {
      const partido = await prisma.partidos.findUnique({
        where: { id: parseInt(partido_id) },
      });
      if (!partido) {
        return res.status(404).json({ error: "El partido no existe" });
      }
    }
    if (jugador_id) {
      const jugador = await prisma.jugadores.findUnique({
        where: { id: parseInt(jugador_id) },
      });
      if (!jugador) {
        return res.status(404).json({ error: "El jugador no existe" });
      }
    }
    const estadisticaActualizada = await prisma.estadisticas_partido.update({
      where: { id: parseInt(id) },
      data: {
        partido_id: partido_id ? parseInt(partido_id) : undefined,
        jugador_id: jugador_id ? parseInt(jugador_id) : undefined,
        hits: hits ? parseInt(hits) : undefined,
        carreras: carreras ? parseInt(carreras) : undefined,
        bases: bases ? parseInt(bases) : undefined,
        errores: errores ? parseInt(errores) : undefined,
        strikeouts: strikeouts ? parseInt(strikeouts) : undefined,
        innings_lanzados: innings_lanzados
          ? parseFloat(innings_lanzados)
          : undefined,
        carreras_permitidas: carreras_permitidas
          ? parseInt(carreras_permitidas)
          : undefined,
        ponches: ponches ? parseInt(ponches) : undefined,
        bases_por_bola: bases_por_bola ? parseInt(bases_por_bola) : undefined,
        fecha_registro: fecha_registro ? new Date(fecha_registro) : undefined,
      },
    });
    res.json(estadisticaActualizada);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al actualizar estadística de partido" });
  }
});

//  Eliminar estadística de partido por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.estadisticas_partido.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Estadística eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar estadística" });
  }
});

module.exports = router;
