const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los calendarios
router.get("/", async (req, res) => {
  try {
    const calendarios = await prisma.calendario.findMany({
      include: { temporadas: true },
    });
    res.json(calendarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener calendarios" });
  }
});

//  Obtener calendario por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const calendario = await prisma.calendario.findUnique({
      where: { id: parseInt(id) },
      include: { temporadas: true },
    });
    if (!calendario) {
      return res.status(404).json({ error: "Calendario no encontrado" });
    }
    res.json(calendario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener calendario" });
  }
});

//  Crear un nuevo calendario
router.post("/", async (req, res) => {
  const { temporada_id, fecha, descripcion } = req.body;
  if (!temporada_id || !fecha) {
    return res
      .status(400)
      .json({ error: "temporada_id y fecha son obligatorios" });
  }
  try {
    // Verificar que la temporada exista
    const temporada = await prisma.temporadas.findUnique({
      where: { id: parseInt(temporada_id) },
    });
    if (!temporada) {
      return res.status(404).json({ error: "La temporada no existe" });
    }
    const nuevoCalendario = await prisma.calendario.create({
      data: {
        temporada_id: parseInt(temporada_id),
        fecha: new Date(fecha),
        descripcion,
      },
    });
    res.status(201).json(nuevoCalendario);
  } catch (error) {
    res.status(400).json({ error: "Error al crear calendario" });
  }
});

//  Actualizar calendario por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { temporada_id, fecha, descripcion } = req.body;
  try {
    const calendarioActualizado = await prisma.calendario.update({
      where: { id: parseInt(id) },
      data: {
        temporada_id: temporada_id ? parseInt(temporada_id) : undefined,
        fecha: fecha ? new Date(fecha) : undefined,
        descripcion,
      },
    });
    res.json(calendarioActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar calendario" });
  }
});

//Eliminar calendario por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.calendario.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Calendario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar calendario" });
  }
});

module.exports = router;
