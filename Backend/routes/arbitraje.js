const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los arbitrajes
router.get("/", async (req, res) => {
  try {
    const arbitrajes = await prisma.arbitraje.findMany({
      include: {
        arbitros: true,
        partidos: true,
      },
    });
    res.json(arbitrajes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener arbitrajes" });
  }
});

// Obtener un arbitraje por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const arbitraje = await prisma.arbitraje.findUnique({
      where: { id: parseInt(id) },
      include: {
        arbitros: true,
        partidos: true,
      },
    });
    if (!arbitraje) {
      return res.status(404).json({ error: "Arbitraje no encontrado" });
    }
    res.json(arbitraje);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el arbitraje" });
  }
});

// Crear un nuevo arbitraje
router.post("/", async (req, res) => {
  const { partido_id, arbitro_id, rol } = req.body;

  if (!partido_id || !arbitro_id || !rol) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const partido = await prisma.partidos.findUnique({
      where: { id: parseInt(partido_id) },
    });
    if (!partido) {
      return res.status(404).json({ error: "El partido no existe" });
    }

    const arbitro = await prisma.arbitros.findUnique({
      where: { id: parseInt(arbitro_id) },
    });
    if (!arbitro) {
      return res.status(404).json({ error: "El árbitro no existe" });
    }

    const nuevoArbitraje = await prisma.arbitraje.create({
      data: { partido_id, arbitro_id, rol },
    });
    res.status(201).json(nuevoArbitraje);
  } catch (error) {
    res.status(400).json({ error: "Error al crear arbitraje" });
  }
});

//  Actualizar un arbitraje existente
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { partido_id, arbitro_id, rol } = req.body;
  try {
    const arbitrajeActualizado = await prisma.arbitraje.update({
      where: { id: parseInt(id) },
      data: { partido_id, arbitro_id, rol },
    });
    res.json(arbitrajeActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar arbitraje" });
  }
});

module.exports = router;
