const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//  Obtener todas las posiciones de jugadores
router.get("/", async (req, res) => {
  try {
    const posiciones = await prisma.jugadores_posicion.findMany({
      include: { jugadores: true, posiciones: true, temporadas: true },
    });
    res.json(posiciones);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener posiciones de jugadores" });
  }
});

// Obtener una posición de jugador por ID compuesto
router.get("/:jugador_id/:posicion_id/:temporada_id", async (req, res) => {
  const { jugador_id, posicion_id, temporada_id } = req.params;
  try {
    const posicion = await prisma.jugadores_posicion.findUnique({
      where: {
        jugador_id_posicion_id_temporada_id: {
          jugador_id: parseInt(jugador_id),
          posicion_id: parseInt(posicion_id),
          temporada_id: parseInt(temporada_id),
        },
      },
      include: { jugadores: true, posiciones: true, temporadas: true },
    });
    if (!posicion) {
      return res
        .status(404)
        .json({ error: "Posición de jugador no encontrada" });
    }
    res.json(posicion);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener posición de jugador" });
  }
});

//  Crear una nueva posición de jugador
router.post("/", async (req, res) => {
  const { jugador_id, posicion_id, temporada_id } = req.body;

  if (
    jugador_id === undefined ||
    posicion_id === undefined ||
    temporada_id === undefined
  ) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar que el jugador exista
    const jugador = await prisma.jugadores.findUnique({
      where: { id: parseInt(jugador_id) },
    });
    if (!jugador) {
      return res.status(404).json({ error: "El jugador no existe" });
    }
    // Verificar que la posición exista
    const posicion = await prisma.posiciones.findUnique({
      where: { id: parseInt(posicion_id) },
    });
    if (!posicion) {
      return res.status(404).json({ error: "La posición no existe" });
    }
    // Verificar que la temporada exista
    const temporada = await prisma.temporadas.findUnique({
      where: { id: parseInt(temporada_id) },
    });
    if (!temporada) {
      return res.status(404).json({ error: "La temporada no existe" });
    }

    const nuevaRelacion = await prisma.jugadores_posicion.create({
      data: {
        jugador_id: parseInt(jugador_id),
        posicion_id: parseInt(posicion_id),
        temporada_id: parseInt(temporada_id),
      },
    });
    res.status(201).json(nuevaRelacion);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al crear relación jugador-posicion-temporada" });
  }
});

//  Actualizar una posición de jugador por ID compuesto
router.put("/:jugador_id/:posicion_id/:temporada_id", async (req, res) => {
  const { jugador_id, posicion_id, temporada_id } = req.params;
  const { nueva_posicion_id, nueva_temporada_id } = req.body;

  // Solo permitimos actualizar la posición o temporada
  if (!nueva_posicion_id && !nueva_temporada_id) {
    return res.status(400).json({
      error:
        "Debes enviar al menos un campo para actualizar (nueva_posicion_id o nueva_temporada_id)",
    });
  }

  try {
    // Verificar si la nueva posición existe (si se quiere actualizar)
    if (nueva_posicion_id) {
      const posicion = await prisma.posiciones.findUnique({
        where: { id: parseInt(nueva_posicion_id) },
      });
      if (!posicion) {
        return res.status(404).json({ error: "La nueva posición no existe" });
      }
    }
    // Verificar si la nueva temporada existe (si se quiere actualizar)
    if (nueva_temporada_id) {
      const temporada = await prisma.temporadas.findUnique({
        where: { id: parseInt(nueva_temporada_id) },
      });
      if (!temporada) {
        return res.status(404).json({ error: "La nueva temporada no existe" });
      }
    }

    const actualizada = await prisma.jugadores_posicion.update({
      where: {
        jugador_id_posicion_id_temporada_id: {
          jugador_id: parseInt(jugador_id),
          posicion_id: parseInt(posicion_id),
          temporada_id: parseInt(temporada_id),
        },
      },
      data: {
        posicion_id: nueva_posicion_id
          ? parseInt(nueva_posicion_id)
          : undefined,
        temporada_id: nueva_temporada_id
          ? parseInt(nueva_temporada_id)
          : undefined,
      },
    });
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({
      error: "Error al actualizar relación jugador-posicion-temporada",
    });
  }
});

//  Eliminar una posición de jugador por ID compuesto
router.delete("/:jugador_id/:posicion_id/:temporada_id", async (req, res) => {
  const { jugador_id, posicion_id, temporada_id } = req.params;
  try {
    await prisma.jugadores_posicion.delete({
      where: {
        jugador_id_posicion_id_temporada_id: {
          jugador_id: parseInt(jugador_id),
          posicion_id: parseInt(posicion_id),
          temporada_id: parseInt(temporada_id),
        },
      },
    });
    res.json({
      message: "Relación jugador-posicion-temporada eliminada correctamente",
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al eliminar relación jugador-posicion-temporada" });
  }
});

module.exports = router;
