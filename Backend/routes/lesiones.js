const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  Obtener todas las lesiones
router.get("/", async (req, res) => {
  try {
    const lesiones = await prisma.lesiones.findMany({
      include: { jugadores: true },
    });
    res.json(lesiones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener lesiones" });
  }
});

//  Obtener lesión por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const lesion = await prisma.lesiones.findUnique({
      where: { id: parseInt(id) },
      include: { jugadores: true },
    });
    if (!lesion) {
      return res.status(404).json({ error: "Lesión no encontrada" });
    }
    res.json(lesion);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener lesión" });
  }
});

// Crear una nueva lesión (todos los campos obligatorios y verificación de FK)
router.post("/", async (req, res) => {
  const { jugador_id, fecha_inicio, tipo, descripcion, estado } = req.body;

  // Validar que los campos obligatorios estén presentes
  if (jugador_id === undefined || !fecha_inicio) {
    return res
      .status(400)
      .json({ error: "jugador_id y fecha_inicio son obligatorios" });
  }

  try {
    // Verificar que el jugador exista
    const jugador = await prisma.jugadores.findUnique({
      where: { id: parseInt(jugador_id) },
    });
    if (!jugador) {
      return res.status(404).json({ error: "El jugador no existe" });
    }
    const nuevaLesion = await prisma.lesiones.create({
      data: {
        jugador_id: parseInt(jugador_id),
        fecha_inicio: new Date(fecha_inicio),
        tipo,
        descripcion,
        estado,
      },
    });
    res.status(201).json(nuevaLesion);
  } catch (error) {
    res.status(400).json({ error: "Error al crear lesión" });
  }
});

//  Actualizar lesión por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { jugador_id, fecha_inicio, fecha_fin, tipo, descripcion, estado } =
    req.body;

  // Validar que los campos obligatorios estén presentes
  if (jugador_id === undefined || !fecha_inicio) {
    return res
      .status(400)
      .json({ error: "jugador_id y fecha_inicio son obligatorios" });
  }

  try {
    // Verificar que el jugador exista
    const jugador = await prisma.jugadores.findUnique({
      where: { id: parseInt(jugador_id) },
    });
    if (!jugador) {
      return res.status(404).json({ error: "El jugador no existe" });
    }
    const lesionActualizada = await prisma.lesiones.update({
      where: { id: parseInt(id) },
      data: {
        jugador_id: parseInt(jugador_id),
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: fecha_fin ? new Date(fecha_fin) : undefined,
        tipo,
        descripcion,
        estado,
      },
    });
    res.json(lesionActualizada);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar lesión" });
  }
});

// Eliminar lesión por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.lesiones.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Lesión eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar lesión" });
  }
});

module.exports = router;
