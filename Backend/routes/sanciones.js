const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  Obtener todas las sanciones
router.get("/", async (req, res) => {
  try {
    const sanciones = await prisma.sanciones.findMany({
      include: { equipos: true, jugadores: true },
    });
    res.json(sanciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener sanciones" });
  }
});

// Obtener sanción por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sancion = await prisma.sanciones.findUnique({
      where: { id: parseInt(id) },
      include: { equipos: true, jugadores: true },
    });
    if (!sancion) {
      return res.status(404).json({ error: "Sanción no encontrada" });
    }
    res.json(sancion);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener sanción" });
  }
});

//  Crear una nueva sanción (todos los campos obligatorios y verificación de FK)
router.post("/", async (req, res) => {
  const {
    jugador_id,
    equipo_id,
    fecha_inicio,
    fecha_fin,
    motivo,
    tipo_sancion,
    creado_en,
  } = req.body;

  // Validar campos obligatorios
  if (!fecha_inicio || !motivo || !tipo_sancion) {
    return res
      .status(400)
      .json({ error: "fecha_inicio, motivo y tipo_sancion son obligatorios" });
  }

  try {
    // Verificar FK jugador si se envía
    if (jugador_id !== undefined && jugador_id !== null) {
      const jugador = await prisma.jugadores.findUnique({
        where: { id: parseInt(jugador_id) },
      });
      if (!jugador) {
        return res.status(404).json({ error: "El jugador no existe" });
      }
    }
    // Verificar FK equipo si se envía
    if (equipo_id !== undefined && equipo_id !== null) {
      const equipo = await prisma.equipos.findUnique({
        where: { id: parseInt(equipo_id) },
      });
      if (!equipo) {
        return res.status(404).json({ error: "El equipo no existe" });
      }
    }

    const nuevaSancion = await prisma.sanciones.create({
      data: {
        jugador_id: jugador_id !== undefined ? parseInt(jugador_id) : null,
        equipo_id: equipo_id !== undefined ? parseInt(equipo_id) : null,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: fecha_fin ? new Date(fecha_fin) : undefined,
        motivo,
        tipo_sancion,
        creado_en: creado_en ? new Date(creado_en) : undefined,
      },
    });
    res.status(201).json(nuevaSancion);
  } catch (error) {
    res.status(400).json({ error: "Error al crear sanción" });
  }
});

//  Actualizar sanción por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    jugador_id,
    equipo_id,
    fecha_inicio,
    fecha_fin,
    motivo,
    tipo_sancion,
    creado_en,
  } = req.body;

  // Validar campos obligatorios
  if (!fecha_inicio || !motivo || !tipo_sancion) {
    return res
      .status(400)
      .json({ error: "fecha_inicio, motivo y tipo_sancion son obligatorios" });
  }

  try {
    // Verificar FK jugador si se envía
    if (jugador_id !== undefined && jugador_id !== null) {
      const jugador = await prisma.jugadores.findUnique({
        where: { id: parseInt(jugador_id) },
      });
      if (!jugador) {
        return res.status(404).json({ error: "El jugador no existe" });
      }
    }
    // Verificar FK equipo si se envía
    if (equipo_id !== undefined && equipo_id !== null) {
      const equipo = await prisma.equipos.findUnique({
        where: { id: parseInt(equipo_id) },
      });
      if (!equipo) {
        return res.status(404).json({ error: "El equipo no existe" });
      }
    }

    const sancionActualizada = await prisma.sanciones.update({
      where: { id: parseInt(id) },
      data: {
        jugador_id: jugador_id !== undefined ? parseInt(jugador_id) : null,
        equipo_id: equipo_id !== undefined ? parseInt(equipo_id) : null,
        fecha_inicio: new Date(fecha_inicio),
        fecha_fin: fecha_fin ? new Date(fecha_fin) : undefined,
        motivo,
        tipo_sancion,
        creado_en: creado_en ? new Date(creado_en) : undefined,
      },
    });
    res.json(sancionActualizada);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar sanción" });
  }
});

// Eliminar sanción por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.sanciones.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Sanción eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar sanción" });
  }
});

module.exports = router;
