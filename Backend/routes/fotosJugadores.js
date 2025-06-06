const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todas las fotos de jugadores
router.get("/", async (req, res) => {
  try {
    const fotos = await prisma.fotos_jugadores.findMany({
      include: { jugadores: true },
    });
    res.json(fotos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener fotos de jugadores" });
  }
});

// Obtener foto de jugador por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const foto = await prisma.fotos_jugadores.findUnique({
      where: { id: parseInt(id) },
      include: { jugadores: true },
    });
    if (!foto) {
      return res.status(404).json({ error: "Foto no encontrada" });
    }
    res.json(foto);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener foto" });
  }
});

//  Crear una nueva foto de jugador
router.post("/", async (req, res) => {
  const { jugador_id, url, descripcion, fecha_subida } = req.body;

  // Validar que los campos obligatorios estén presentes
  if (jugador_id === undefined || url === undefined || url === "") {
    return res.status(400).json({ error: "jugador_id y url son obligatorios" });
  }

  try {
    // Verificar que el jugador exista
    const jugador = await prisma.jugadores.findUnique({
      where: { id: parseInt(jugador_id) },
    });
    if (!jugador) {
      return res.status(404).json({ error: "El jugador no existe" });
    }
    const nuevaFoto = await prisma.fotos_jugadores.create({
      data: {
        jugador_id: parseInt(jugador_id),
        url,
        descripcion,
        fecha_subida: fecha_subida ? new Date(fecha_subida) : undefined,
      },
    });
    res.status(201).json(nuevaFoto);
  } catch (error) {
    res.status(400).json({ error: "Error al crear foto de jugador" });
  }
});

// Actualizar foto de jugador por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { jugador_id, url, descripcion, fecha_subida } = req.body;

  // Validar que los campos obligatorios estén presentes
  if (jugador_id === undefined || url === undefined || url === "") {
    return res.status(400).json({ error: "jugador_id y url son obligatorios" });
  }

  try {
    // Verificar que el jugador exista
    const jugador = await prisma.jugadores.findUnique({
      where: { id: parseInt(jugador_id) },
    });
    if (!jugador) {
      return res.status(404).json({ error: "El jugador no existe" });
    }
    const fotoActualizada = await prisma.fotos_jugadores.update({
      where: { id: parseInt(id) },
      data: {
        jugador_id: parseInt(jugador_id),
        url,
        descripcion,
        fecha_subida: fecha_subida ? new Date(fecha_subida) : undefined,
      },
    });
    res.json(fotoActualizada);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar foto de jugador" });
  }
});

//Eliminar foto de jugador por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.fotos_jugadores.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Foto eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar foto" });
  }
});

module.exports = router;
