const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  Obtener todas las temporadas
router.get("/", async (req, res) => {
  try {
    const temporadas = await prisma.temporadas.findMany({
      include: {
        calendario: true,
        estadisticas_jugador: true,
        jugadores_posicion: true,
      },
    });
    res.json(temporadas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener temporadas" });
  }
});

//  Obtener temporada por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const temporada = await prisma.temporadas.findUnique({
      where: { id: parseInt(id) },
      include: {
        calendario: true,
        estadisticas_jugador: true,
        jugadores_posicion: true,
      },
    });
    if (!temporada) {
      return res.status(404).json({ error: "Temporada no encontrada" });
    }
    res.json(temporada);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener temporada" });
  }
});

//  Crear una nueva temporada (todos los campos obligatorios)
router.post("/", async (req, res) => {
  const { nombre, fecha_inicio, fecha_fin } = req.body;

  // Validar que todos los campos obligatorios estén presentes
  if (!nombre || !fecha_inicio || !fecha_fin) {
    return res
      .status(400)
      .json({ error: "nombre, fecha_inicio y fecha_fin son obligatorios" });
  }

  try {
    const nuevaTemporada = await prisma.temporadas.create({
      data: {
        nombre,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
      },
    });
    res.status(201).json(nuevaTemporada);
  } catch (error) {
    res.status(400).json({ error: "Error al crear temporada" });
  }
});

//  Actualizar temporada por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, fecha_inicio, fecha_fin } = req.body;

  // Validar que todos los campos obligatorios estén presentes
  if (!nombre || !fecha_inicio || !fecha_fin) {
    return res
      .status(400)
      .json({ error: "nombre, fecha_inicio y fecha_fin son obligatorios" });
  }

  try {
    const temporadaActualizada = await prisma.temporadas.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: new Date(fecha_fin),
      },
    });
    res.json(temporadaActualizada);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar temporada" });
  }
});

//  Eliminar temporada por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.temporadas.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Temporada eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar temporada" });
  }
});

module.exports = router;
