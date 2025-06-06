const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los jugadores
router.get("/", async (req, res) => {
  try {
    const jugadores = await prisma.jugadores.findMany({
      include: { equipos: true },
    });
    res.json(jugadores);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener jugadores" });
  }
});

// Obtener jugadores por equipo y division
router.get("/filtrar", async (req, res) => {
  const { equipo, division } = req.query;

  if (!equipo || !division ) {
    return res.status(400).json({ error: "Faltan parámetros de filtrado" });
  }

  try {
    const jugadores = await prisma.jugadores.findMany({
      where: {
        equipos: {
          nombre: equipo,
          division: {
            nombre: division
          }
        }
      },
      include: {
        equipos: {
          include: { division: true }
        }
      }
    });

    res.json(jugadores);
  } catch (error) {
    console.error("Error al filtrar jugadores:", error);
    res.status(500).json({ error: "Error al filtrar jugadores" });
  }
});


//  Obtener jugador por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const jugador = await prisma.jugadores.findUnique({
      where: { id: parseInt(id) },
      include: { equipos: true },
    });
    if (!jugador) {
      return res.status(404).json({ error: "Jugador no encontrado" });
    }
    res.json(jugador);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener jugador" });
  }
});


//  Crear un nuevo jugador (todos los campos obligatorios y verificación de FK)
router.post("/", async (req, res) => {
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    genero,
    equipo_id,
    fecha_ingreso,
    nacionalidad,
  } = req.body;

  // Validar que todos los campos obligatorios estén presentes
  if (
    !nombre ||
    !apellido ||
    !fecha_nacimiento ||
    !genero ||
    equipo_id === undefined ||
    !fecha_ingreso
  ) {
    return res
      .status(400)
      .json({ error: "Todos los campos obligatorios deben estar presentes" });
  }

  try {
    // Verificar que el equipo exista
    const equipo = await prisma.equipos.findUnique({
      where: { id: parseInt(equipo_id) },
    });
    if (!equipo) {
      return res.status(404).json({ error: "El equipo no existe" });
    }
    const nuevoJugador = await prisma.jugadores.create({
      data: {
        nombre,
        apellido,
        fecha_nacimiento: new Date(fecha_nacimiento),
        genero,
        equipo_id: parseInt(equipo_id),
        fecha_ingreso: new Date(fecha_ingreso),
        nacionalidad,
      },
    });
    res.status(201).json(nuevoJugador);
  } catch (error) {
    res.status(400).json({ error: "Error al crear jugador" });
  }
});

//  Actualizar jugador por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    fecha_nacimiento,
    genero,
    equipo_id,
    fecha_ingreso,
    nacionalidad,
  } = req.body;

  // Validar que todos los campos obligatorios estén presentes
  if (
    !nombre ||
    !apellido ||
    !fecha_nacimiento ||
    !genero ||
    equipo_id === undefined ||
    !fecha_ingreso
  ) {
    return res
      .status(400)
      .json({ error: "Todos los campos obligatorios deben estar presentes" });
  }

  try {
    // Verificar que el equipo exista
    const equipo = await prisma.equipos.findUnique({
      where: { id: parseInt(equipo_id) },
    });
    if (!equipo) {
      return res.status(404).json({ error: "El equipo no existe" });
    }
    const jugadorActualizado = await prisma.jugadores.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        apellido,
        fecha_nacimiento: new Date(fecha_nacimiento),
        genero,
        equipo_id: parseInt(equipo_id),
        fecha_ingreso: new Date(fecha_ingreso),
        nacionalidad,
      },
    });
    res.json(jugadorActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar jugador" });
  }
});

//  Eliminar jugador por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.jugadores.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Jugador eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar jugador" });
  }
});

module.exports = router;
