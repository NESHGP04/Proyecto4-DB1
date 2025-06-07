const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Obtener todos los calendarios
// Obtener todos los calendarios, o filtrados por división
router.get("/", async (req, res) => {
  const divisionId = req.query.division;

  try {
    // Obtener todos los calendarios con su temporada y división asociada
    const calendarios = await prisma.calendario.findMany({
      include: {
        temporadas: {
          include: {
            division: true, // Asegúrate de que la relación exista en Prisma
          },
        },
      },
    });

    // Si se proporcionó un ID de división, filtramos
    let resultado = calendarios;
    if (divisionId) {
      resultado = calendarios.filter(
        (cal) => cal.temporadas?.division?.id === parseInt(divisionId)
      );
    }

    res.json(resultado);
  } catch (error) {
    console.error("Error al obtener calendarios:", error);
    res.status(500).json({ error: "Error al obtener calendarios" });
  }
});

//  Obtener calendario por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const calendario = await prisma.calendario.findUnique({
      where: { id: parseInt(id) },
      include: { temporadas: true },
    });
    if (!calendario) {
      return res.status(404).json({ error: "Calendario no encontrado" });
    }
    res.json(calendario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener calendario" });
  }
});

//  Crear un nuevo calendario
router.post("/", async (req, res) => {
  const { temporada_id, fecha, descripcion } = req.body;
  if (!temporada_id || !fecha) {
    return res
      .status(400)
      .json({ error: "temporada_id y fecha son obligatorios" });
  }
  try {
    // Verificar que la temporada exista
    const temporada = await prisma.temporadas.findUnique({
      where: { id: parseInt(temporada_id) },
    });
    if (!temporada) {
      return res.status(404).json({ error: "La temporada no existe" });
    }
    const nuevoCalendario = await prisma.calendario.create({
      data: {
        temporada_id: parseInt(temporada_id),
        fecha: new Date(fecha),
        descripcion,
      },
    });
    res.status(201).json(nuevoCalendario);
  } catch (error) {
    res.status(400).json({ error: "Error al crear calendario" });
  }
});

//  Actualizar calendario por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { temporada_id, fecha, descripcion } = req.body;
  try {
    const calendarioActualizado = await prisma.calendario.update({
      where: { id: parseInt(id) },
      data: {
        temporada_id: temporada_id ? parseInt(temporada_id) : undefined,
        fecha: fecha ? new Date(fecha) : undefined,
        descripcion,
      },
    });
    res.json(calendarioActualizado);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar calendario" });
  }
});

//Eliminar calendario por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.calendario.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Calendario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar calendario" });
  }
});
// Obtener partidos del calendario (con equipos y división)
router.get("/partidos", async (req, res) => {
  try {
    const partidos = await prisma.partidos.findMany({
      include: {
        equipos_partidos_equipo_local_idToequipos: {
          select: { nombre: true, division_id: true },
        },
        equipos_partidos_equipo_visitante_idToequipos: {
          select: { nombre: true, division_id: true },
        },
      },
    });
    res.json(partidos);
  } catch (error) {
    console.error("Error al obtener partidos:", error);
    res.status(500).json({ error: "Error al obtener partidos" });
  }
});
module.exports = router;
