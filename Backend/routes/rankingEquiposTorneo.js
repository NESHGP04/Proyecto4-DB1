const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  Obtener todos los rankings de equipos en torneos
router.get("/", async (req, res) => {
  try {
    const rankings = await prisma.ranking_equipos_torneo.findMany({
      include: { division: true, equipos: true, torneos: true },
    });
    res.json(rankings);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener rankings" });
  }
});

// Obtener ranking por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ranking = await prisma.ranking_equipos_torneo.findUnique({
      where: { id: parseInt(id) },
      include: { division: true, equipos: true, torneos: true },
    });
    if (!ranking) {
      return res.status(404).json({ error: "Ranking no encontrado" });
    }
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener ranking" });
  }
});

// Crear un nuevo ranking (todos los campos obligatorios y verificación de FK)
router.post("/", async (req, res) => {
  const {
    torneo_id,
    equipo_id,
    division_id,
    puntos,
    partidos_ganados,
    partidos_perdidos,
    partidos_empatados,
  } = req.body;

  // Validar que todos los campos obligatorios estén presentes
  if (
    torneo_id === undefined ||
    equipo_id === undefined ||
    division_id === undefined
  ) {
    return res
      .status(400)
      .json({ error: "torneo_id, equipo_id y division_id son obligatorios" });
  }

  try {
    // Verificar FK torneo
    const torneo = await prisma.torneos.findUnique({
      where: { id: parseInt(torneo_id) },
    });
    if (!torneo) {
      return res.status(404).json({ error: "El torneo no existe" });
    }
    // Verificar FK equipo
    const equipo = await prisma.equipos.findUnique({
      where: { id: parseInt(equipo_id) },
    });
    if (!equipo) {
      return res.status(404).json({ error: "El equipo no existe" });
    }
    // Verificar FK división
    const division = await prisma.division.findUnique({
      where: { id: parseInt(division_id) },
    });
    if (!division) {
      return res.status(404).json({ error: "La división no existe" });
    }

    const nuevoRanking = await prisma.ranking_equipos_torneo.create({
      data: {
        torneo_id: parseInt(torneo_id),
        equipo_id: parseInt(equipo_id),
        division_id: parseInt(division_id),
        puntos: puntos !== undefined ? parseInt(puntos) : undefined,
        partidos_ganados:
          partidos_ganados !== undefined
            ? parseInt(partidos_ganados)
            : undefined,
        partidos_perdidos:
          partidos_perdidos !== undefined
            ? parseInt(partidos_perdidos)
            : undefined,
        partidos_empatados:
          partidos_empatados !== undefined
            ? parseInt(partidos_empatados)
            : undefined,
      },
    });
    res.status(201).json(nuevoRanking);
  } catch (error) {
    res.status(400).json({ error: "Error al crear ranking" });
  }
});

//  Actualizar ranking por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    torneo_id,
    equipo_id,
    division_id,
    puntos,
    partidos_ganados,
    partidos_perdidos,
    partidos_empatados,
  } = req.body;

  // Validar que todos los campos obligatorios estén presentes
  if (
    torneo_id === undefined ||
    equipo_id === undefined ||
    division_id === undefined
  ) {
    return res
      .status(400)
      .json({ error: "torneo_id, equipo_id y division_id son obligatorios" });
  }

  try {
    // Verificar FK torneo
    const torneo = await prisma.torneos.findUnique({
      where: { id: parseInt(torneo_id) },
    });
    if (!torneo) {
      return res.status(404).json({ error: "El torneo no existe" });
    }
    // Verificar FK equipo
    const equipo = await prisma.equipos.findUnique({
      where: { id: parseInt(equipo_id) },
    });
    if (!equipo) {
      return res.status(404).json({ error: "El equipo no existe" });
    }
    // Verificar FK división
    const division = await prisma.division.findUnique({
      where: { id: parseInt(division_id) },
    });
    if (!division) {
      return res.status(404).json({ error: "La división no existe" });
    }

    const rankingActualizado = await prisma.ranking_equipos_torneo.update({
      where: { id: parseInt(id) },
      data: {
        torneo_id: parseInt(torneo_id),
        equipo_id: parseInt(equipo_id),
        division_id: parseInt(division_id),
        puntos: puntos !== undefined ? parseInt(puntos) : undefined,
        partidos_ganados:
          partidos_ganados !== undefined
            ? parseInt(partidos_ganados)
            : undefined,
        partidos_perdidos:
          partidos_perdidos !== undefined
            ? parseInt(partidos_perdidos)
            : undefined,
        partidos_empatados:
          partidos_empatados !== undefined
            ? parseInt(partidos_empatados)
            : undefined,
      },
    });
    res.json(rankingActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar ranking" });
  }
});

//  Eliminar ranking por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.ranking_equipos_torneo.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Ranking eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar ranking" });
  }
});

module.exports = router;
