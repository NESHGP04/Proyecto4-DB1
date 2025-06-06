const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los entrenadores
router.get("/", async (req, res) => {
  try {
    const entrenadores = await prisma.entrenadores.findMany({
      include: { equipos: true },
    });
    res.json(entrenadores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener entrenadores" });
  }
});

//  Obtener entrenador por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const entrenador = await prisma.entrenadores.findUnique({
      where: { id: parseInt(id) },
      include: { equipos: true },
    });
    if (!entrenador) {
      return res.status(404).json({ error: "Entrenador no encontrado" });
    }
    res.json(entrenador);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener entrenador" });
  }
});

//  Crear un nuevo entrenador
router.post("/", async (req, res) => {
  const { nombre, apellido, rol, equipo_id, correo } = req.body;
  if (!nombre || !apellido || !rol || !equipo_id) {
    return res
      .status(400)
      .json({ error: "nombre, apellido, rol y equipo_id son obligatorios" });
  }
  try {
    // Verificar que el equipo exista
    const equipo = await prisma.equipos.findUnique({
      where: { id: parseInt(equipo_id) },
    });
    if (!equipo) {
      return res.status(404).json({ error: "El equipo no existe" });
    }
    const nuevoEntrenador = await prisma.entrenadores.create({
      data: {
        nombre,
        apellido,
        rol,
        equipo_id: parseInt(equipo_id),
        correo,
      },
    });
    res.status(201).json(nuevoEntrenador);
  } catch (error) {
    res.status(400).json({ error: "Error al crear entrenador" });
  }
});

// Actualizar entrenador por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, rol, equipo_id, correo } = req.body;
  try {
    // Si se quiere actualizar el equipo, verificar que exista
    if (equipo_id) {
      const equipo = await prisma.equipos.findUnique({
        where: { id: parseInt(equipo_id) },
      });
      if (!equipo) {
        return res.status(404).json({ error: "El equipo no existe" });
      }
    }
    const entrenadorActualizado = await prisma.entrenadores.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        apellido,
        rol,
        equipo_id: equipo_id ? parseInt(equipo_id) : undefined,
        correo,
      },
    });
    res.json(entrenadorActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar entrenador" });
  }
});

//  Eliminar entrenador por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.entrenadores.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Entrenador eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar entrenador" });
  }
});

module.exports = router;
