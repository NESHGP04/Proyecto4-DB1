const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  Obtener todos los estadios
router.get("/", async (req, res) => {
  try {
    const estadios = await prisma.estadios.findMany();
    res.json(estadios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estadios" });
  }
});

//  Obtener estadio por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const estadio = await prisma.estadios.findUnique({
      where: { id: parseInt(id) },
    });
    if (!estadio) {
      return res.status(404).json({ error: "Estadio no encontrado" });
    }
    res.json(estadio);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estadio" });
  }
});

//  Crear un nuevo estadio (campos obligatorios)
router.post("/", async (req, res) => {
  const { nombre, ubicacion, capacidad } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }
  try {
    const nuevoEstadio = await prisma.estadios.create({
      data: {
        nombre,
        ubicacion,
        capacidad: capacidad ? parseInt(capacidad) : undefined,
      },
    });
    res.status(201).json(nuevoEstadio);
  } catch (error) {
    res.status(400).json({ error: "Error al crear estadio" });
  }
});

// Actualizar estadio por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, ubicacion, capacidad } = req.body;
  try {
    const estadioActualizado = await prisma.estadios.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        ubicacion,
        capacidad: capacidad ? parseInt(capacidad) : undefined,
      },
    });
    res.json(estadioActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar estadio" });
  }
});

//  Eliminar estadio por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.estadios.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Estadio eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar estadio" });
  }
});

module.exports = router;
