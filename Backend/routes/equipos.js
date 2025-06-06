const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  Obtener todos los equipos
router.get("/", async (req, res) => {
  try {
    const equipos = await prisma.equipos.findMany({
      include: { division: true },
    });
    res.json(equipos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener equipos" });
  }
});

//  Obtener equipo por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const equipo = await prisma.equipos.findUnique({
      where: { id: parseInt(id) },
      include: { division: true },
    });
    if (!equipo) {
      return res.status(404).json({ error: "Equipo no encontrado" });
    }
    res.json(equipo);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener equipo" });
  }
});

//  Crear un nuevo equipo
router.post("/", async (req, res) => {
  const { nombre, division_id, ciudad, fecha_creacion } = req.body;
  if (!nombre || !division_id) {
    return res
      .status(400)
      .json({ error: "nombre y division_id son obligatorios" });
  }
  try {
    // Verificar que la división exista
    const division = await prisma.division.findUnique({
      where: { id: parseInt(division_id) },
    });
    if (!division) {
      return res.status(404).json({ error: "La división no existe" });
    }
    const nuevoEquipo = await prisma.equipos.create({
      data: {
        nombre,
        division_id: parseInt(division_id),
        ciudad,
        fecha_creacion: fecha_creacion ? new Date(fecha_creacion) : undefined,
      },
    });
    res.status(201).json(nuevoEquipo);
  } catch (error) {
    res.status(400).json({ error: "Error al crear equipo" });
  }
});

//  Actualizar equipo por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, division_id, ciudad, fecha_creacion } = req.body;
  try {
    // Si se quiere actualizar la división, verificar que exista
    if (division_id) {
      const division = await prisma.division.findUnique({
        where: { id: parseInt(division_id) },
      });
      if (!division) {
        return res.status(404).json({ error: "La división no existe" });
      }
    }
    const equipoActualizado = await prisma.equipos.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        division_id: division_id ? parseInt(division_id) : undefined,
        ciudad,
        fecha_creacion: fecha_creacion ? new Date(fecha_creacion) : undefined,
      },
    });
    res.json(equipoActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar equipo" });
  }
});

//  Eliminar equipo por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.equipos.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Equipo eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar equipo" });
  }
});

module.exports = router;
