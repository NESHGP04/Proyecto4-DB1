const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los partidos
router.get("/", async (req, res) => {
  const { divisionId } = req.query;
  console.log('divisionId recibido:', divisionId);

  try {
    const partidos = await prisma.partidos.findMany({
      include: {
        equipos_partidos_equipo_local_idToequipos: {
          include: { division: true },
        },
        equipos_partidos_equipo_visitante_idToequipos: {
          include: { division: true },
        },
        estadios: true,
        torneos: true,
      },
    });

    // Si no se envió divisionId, devolver todos
    if (!divisionId) {
      return res.json(partidos);
    }

    // Filtrar en JS los partidos cuyo equipo local o visitante tenga ese divisionId
    const filtrados = partidos.filter(
      (p) =>
        p.equipos_partidos_equipo_local_idToequipos.division_id === parseInt(divisionId) ||
        p.equipos_partidos_equipo_visitante_idToequipos.division_id === parseInt(divisionId)
    );

    res.json(filtrados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener partidos" });
  }
});


// Obtener partido por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const partido = await prisma.partidos.findUnique({
      where: { id: parseInt(id) },
      include: {
        equipos_partidos_equipo_local_idToequipos: true,
        equipos_partidos_equipo_visitante_idToequipos: true,
        estadios: true,
        torneos: true,
      },
    });
    if (!partido) {
      return res.status(404).json({ error: "Partido no encontrado" });
    }
    res.json(partido);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener partido" });
  }
});

// Crear un nuevo partido (todos los campos obligatorios y verificación de FK)
router.post("/", async (req, res) => {
  const {
    torneo_id,
    equipo_local_id,
    equipo_visitante_id,
    fecha_hora,
    resultado,
    score_local,
    score_visitante,
    estadio_id,
  } = req.body;

  // Validar que todos los campos obligatorios estén presentes
  if (
    torneo_id === undefined ||
    equipo_local_id === undefined ||
    equipo_visitante_id === undefined ||
    !fecha_hora ||
    estadio_id === undefined
  ) {
    return res
      .status(400)
      .json({ error: "Todos los campos obligatorios deben estar presentes" });
  }

  try {
    // Verificar FK torneo
    const torneo = await prisma.torneos.findUnique({
      where: { id: parseInt(torneo_id) },
    });
    if (!torneo) {
      return res.status(404).json({ error: "El torneo no existe" });
    }
    // Verificar FK equipo local
    const equipoLocal = await prisma.equipos.findUnique({
      where: { id: parseInt(equipo_local_id) },
    });
    if (!equipoLocal) {
      return res.status(404).json({ error: "El equipo local no existe" });
    }
    // Verificar FK equipo visitante
    const equipoVisitante = await prisma.equipos.findUnique({
      where: { id: parseInt(equipo_visitante_id) },
    });
    if (!equipoVisitante) {
      return res.status(404).json({ error: "El equipo visitante no existe" });
    }
    // Verificar FK estadio
    const estadio = await prisma.estadios.findUnique({
      where: { id: parseInt(estadio_id) },
    });
    if (!estadio) {
      return res.status(404).json({ error: "El estadio no existe" });
    }

    const nuevoPartido = await prisma.partidos.create({
      data: {
        torneo_id: parseInt(torneo_id),
        equipo_local_id: parseInt(equipo_local_id),
        equipo_visitante_id: parseInt(equipo_visitante_id),
        fecha_hora: new Date(fecha_hora),
        resultado,
        score_local:
          score_local !== undefined ? parseInt(score_local) : undefined,
        score_visitante:
          score_visitante !== undefined ? parseInt(score_visitante) : undefined,
        estadio_id: parseInt(estadio_id),
      },
    });
    res.status(201).json(nuevoPartido);
  } catch (error) {
    res.status(400).json({ error: "Error al crear partido" });
  }
});

// Actualizar partido por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    torneo_id,
    equipo_local_id,
    equipo_visitante_id,
    fecha_hora,
    resultado,
    score_local,
    score_visitante,
    estadio_id,
  } = req.body;

  // Validar que todos los campos obligatorios estén presentes
  if (
    torneo_id === undefined ||
    equipo_local_id === undefined ||
    equipo_visitante_id === undefined ||
    !fecha_hora ||
    estadio_id === undefined
  ) {
    return res
      .status(400)
      .json({ error: "Todos los campos obligatorios deben estar presentes" });
  }

  try {
    // Verificar FK torneo
    const torneo = await prisma.torneos.findUnique({
      where: { id: parseInt(torneo_id) },
    });
    if (!torneo) {
      return res.status(404).json({ error: "El torneo no existe" });
    }
    // Verificar FK equipo local
    const equipoLocal = await prisma.equipos.findUnique({
      where: { id: parseInt(equipo_local_id) },
    });
    if (!equipoLocal) {
      return res.status(404).json({ error: "El equipo local no existe" });
    }
    // Verificar FK equipo visitante
    const equipoVisitante = await prisma.equipos.findUnique({
      where: { id: parseInt(equipo_visitante_id) },
    });
    if (!equipoVisitante) {
      return res.status(404).json({ error: "El equipo visitante no existe" });
    }
    // Verificar FK estadio
    const estadio = await prisma.estadios.findUnique({
      where: { id: parseInt(estadio_id) },
    });
    if (!estadio) {
      return res.status(404).json({ error: "El estadio no existe" });
    }

    const partidoActualizado = await prisma.partidos.update({
      where: { id: parseInt(id) },
      data: {
        torneo_id: parseInt(torneo_id),
        equipo_local_id: parseInt(equipo_local_id),
        equipo_visitante_id: parseInt(equipo_visitante_id),
        fecha_hora: new Date(fecha_hora),
        resultado,
        score_local:
          score_local !== undefined ? parseInt(score_local) : undefined,
        score_visitante:
          score_visitante !== undefined ? parseInt(score_visitante) : undefined,
        estadio_id: parseInt(estadio_id),
      },
    });
    res.json(partidoActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar partido" });
  }
});

//  Eliminar partido por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.partidos.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Partido eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar partido" });
  }
});

module.exports = router;
