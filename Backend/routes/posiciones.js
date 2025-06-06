const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  Obtener todas las posiciones
router.get("/", async (req, res) => {
  try {
    const posiciones = await prisma.posiciones.findMany({
      include: { jugadores_posicion: true },
    });
    res.json(posiciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener posiciones" });
  }
});

//  Obtener posición por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const posicion = await prisma.posiciones.findUnique({
      where: { id: parseInt(id) },
      include: { jugadores_posicion: true },
    });
    if (!posicion) {
      return res.status(404).json({ error: "Posición no encontrada" });
    }
    res.json(posicion);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener posición" });
  }
});

//  Crear una nueva posición (todos los campos obligatorios)
router.post("/", async (req, res) => {
  const { nombre, descripcion } = req.body;

  // Validar que el campo nombre esté presente
  if (!nombre) {
    return res.status(400).json({ error: "El campo nombre es obligatorio" });
  }

  try {
    const nuevaPosicion = await prisma.posiciones.create({
      data: {
        nombre,
        descripcion,
      },
    });
    res.status(201).json(nuevaPosicion);
  } catch (error) {
    res.status(400).json({ error: "Error al crear posición" });
  }
});

//  Actualizar posición por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    return res.status(400).json({ error: "El campo nombre es obligatorio" });
  }

  try {
    const posicionActualizada = await prisma.posiciones.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        descripcion,
      },
    });
    res.json(posicionActualizada);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar posición" });
  }
});

//  Eliminar posición por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.posiciones.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Posición eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar posición" });
  }
});

module.exports = router;
