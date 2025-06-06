const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  Obtener todos los árbitros
router.get("/", async (req, res) => {
  try {
    const arbitros = await prisma.arbitros.findMany();
    res.json(arbitros);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener árbitros" });
  }
});

//  Obtener árbitro por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const arbitro = await prisma.arbitros.findUnique({
      where: { id: parseInt(id) },
    });
    if (!arbitro) {
      return res.status(404).json({ error: "Árbitro no encontrado" });
    }
    res.json(arbitro);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener árbitro" });
  }
});

//  Crear un nuevo árbitro
router.post("/", async (req, res) => {
  const { nombre, apellido, nivel, correo } = req.body;
  if (!nombre || !apellido) {
    return res
      .status(400)
      .json({ error: "Nombre y apellido son obligatorios" });
  }
  try {
    const nuevoArbitro = await prisma.arbitros.create({
      data: { nombre, apellido, nivel, correo },
    });
    res.status(201).json(nuevoArbitro);
  } catch (error) {
    res.status(400).json({ error: "Error al crear árbitro" });
  }
});

// Actualizar árbitro por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, nivel, correo } = req.body;
  try {
    const arbitroActualizado = await prisma.arbitros.update({
      where: { id: parseInt(id) },
      data: { nombre, apellido, nivel, correo },
    });
    res.json(arbitroActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar árbitro" });
  }
});

// Eliminar árbitro por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.arbitros.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Árbitro eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar árbitro" });
  }
});

module.exports = router;
