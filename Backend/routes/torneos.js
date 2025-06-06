const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los torneos
router.get("/", async (req, res) => {
  try {
    const torneos = await prisma.torneos.findMany({
      include: { division: true, partidos: true, ranking_equipos_torneo: true },
    });
    res.json(torneos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener torneos" });
  }
});

//  Obtener torneo por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const torneo = await prisma.torneos.findUnique({
      where: { id: parseInt(id) },
      include: { division: true, partidos: true, ranking_equipos_torneo: true },
    });
    if (!torneo) {
      return res.status(404).json({ error: "Torneo no encontrado" });
    }
    res.json(torneo);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener torneo" });
  }
});

//  Crear un nuevo torneo (todos los campos obligatorios y verificación de FK)
router.post("/", async (req, res) => {
  const { nombre, division_id, fecha_inicio, fecha_fin, estado, temporada_id } =
    req.body;

  // Validar que todos los campos obligatorios estén presentes
  if (!nombre || division_id === undefined || !fecha_inicio || !fecha_fin) {
    return res.status(400).json({
      error: "nombre, division_id, fecha_inicio y fecha_fin son obligatorios",
    });
  }

  try {
    // Verificar FK división
    const division = await prisma.division.findUnique({
      where: { id: parseInt(division_id) },
    });
    if (!division) {
      return res.status(404).json({ error: "La división no existe" });
    }

    // Verificar FK temporada
    const temporada = await prisma.temporadas.findUnique({
      where: { id: parseInt(temporada_id) },
    });
    if (!temporada) {
      return res.status(404).json({ error: "La temporada no existe" });
    }

    const nuevoTorneo = await prisma.torneos.create({
      data: {
        nombre,
        division_id: parseInt(division_id),
        temporada_id: parseInt(temporada_id),
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
        estado: estado || "activo",
      },
    });
    res.status(201).json(nuevoTorneo);
  } catch (error) {
    res.status(400).json({ error: "Error al crear torneo" });
  }
});

// Actualizar torneo por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, division_id, fecha_inicio, fecha_fin, estado, temporada } =
    req.body;

  // Validar que todos los campos obligatorios estén presentes
  if (!nombre || division_id === undefined || !fecha_inicio || !fecha_fin) {
    return res.status(400).json({
      error: "nombre, division_id, fecha_inicio y fecha_fin son obligatorios",
    });
  }

  try {
    // Verificar FK división
    const division = await prisma.division.findUnique({
      where: { id: parseInt(division_id) },
    });
    if (!division) {
      return res.status(404).json({ error: "La división no existe" });
    }

    const torneoActualizado = await prisma.torneos.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        division_id: parseInt(division_id),
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
        estado: estado || "activo",
        temporada,
      },
    });
    res.json(torneoActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar torneo" });
  }
});

//  Eliminar torneo por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.torneos.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Torneo eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar torneo" });
  }
});

module.exports = router;
