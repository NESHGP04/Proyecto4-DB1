const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  Obtener todas las divisiones
router.get("/", async (req, res) => {
  try {
    const divisiones = await prisma.division.findMany();
    res.json(divisiones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener divisiones" });
  }
});

//  Obtener división por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const division = await prisma.division.findUnique({
      where: { id: parseInt(id) },
    });
    if (!division) {
      return res.status(404).json({ error: "División no encontrada" });
    }
    res.json(division);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener división" });
  }
});

//  Crear una nueva división
router.post("/", async (req, res) => {
  const { nombre, descripcion } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre es obligatorio" });
  }
  try {
    const nuevaDivision = await prisma.division.create({
      data: { nombre, descripcion },
    });
    res.status(201).json(nuevaDivision);
  } catch (error) {
    res.status(400).json({ error: "Error al crear división" });
  }
});

//  Actualizar división por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    const divisionActualizada = await prisma.division.update({
      where: { id: parseInt(id) },
      data: { nombre, descripcion },
    });
    res.json(divisionActualizada);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar división" });
  }
});

//  Eliminar división por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.division.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "División eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar división" });
  }
});

module.exports = router;
