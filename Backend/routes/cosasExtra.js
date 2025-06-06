const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Utilidad para convertir BigInt a string en todos los resultados
function fixBigInt(obj) {
  if (Array.isArray(obj)) {
    return obj.map(fixBigInt);
  } else if (obj && typeof obj === "object") {
    const fixed = {};
    for (const key in obj) {
      if (typeof obj[key] === "bigint") {
        fixed[key] = obj[key].toString();
      } else {
        fixed[key] = obj[key];
      }
    }
    return fixed;
  }
  return obj;
}

// Vista jugadores_stats
router.get("/views/jugadores_stats", async (req, res) => {
  try {
    const jugadoresStats = await prisma.$queryRaw`
      SELECT *
      FROM view_jugadores_stats
    `;
    res.json(fixBigInt(jugadoresStats));
  } catch (err) {
    console.error("Error al consultar view_jugadores_stats:", err);
    res.status(500).json({ error: "No se pudo obtener view_jugadores_stats" });
  }
});

// Vista equipos_ranking
router.get("/views/equipos_ranking", async (req, res) => {
  try {
    const equiposRanking = await prisma.$queryRaw`
      SELECT *
      FROM view_equipos_ranking
    `;
    res.json(fixBigInt(equiposRanking));
  } catch (err) {
    console.error("Error al consultar view_equipos_ranking:", err);
    res.status(500).json({ error: "No se pudo obtener view_equipos_ranking" });
  }
});

// Vista partidos_detalles
router.get("/views/partidos_detalles", async (req, res) => {
  try {
    const partidosDetalles = await prisma.$queryRaw`
      SELECT *
      FROM view_partidos_detalles
    `;
    res.json(fixBigInt(partidosDetalles));
  } catch (err) {
    console.error("Error al consultar view_partidos_detalles:", err);
    res
      .status(500)
      .json({ error: "No se pudo obtener view_partidos_detalles" });
  }
});

// Bitácora
router.get("/bitacora", async (req, res) => {
  try {
    const registros = await prisma.bitacora.findMany({
      orderBy: { fecha_hora: "desc" },
    });
    res.json(fixBigInt(registros));
  } catch (err) {
    console.error("Error al obtener Bitacora:", err);
    res.status(500).json({ error: "Error al obtener Bitacora" });
  }
});

// Auditoría equipos
router.get("/auditoria/equipos", async (req, res) => {
  try {
    const registros = await prisma.auditoria_equipos.findMany({
      orderBy: { fecha: "desc" },
    });
    res.json(fixBigInt(registros));
  } catch (err) {
    console.error("Error al obtener auditoria_equipos:", err);
    res.status(500).json({ error: "Error al obtener auditoria_equipos" });
  }
});

// Auditoría jugadores
router.get("/auditoria/jugadores", async (req, res) => {
  try {
    const registros = await prisma.auditoria_jugadores.findMany({
      orderBy: { fecha: "desc" },
    });
    res.json(fixBigInt(registros));
  } catch (err) {
    console.error("Error al obtener auditoria_jugadores:", err);
    res.status(500).json({ error: "Error al obtener auditoria_jugadores" });
  }
});

// GET /stats/fielders/:temporadaId
router.get("/stats/fielders/:temporadaId", async (req, res) => {
  const temporadaId = parseInt(req.params.temporadaId, 10);

  try {
    const fielders = await prisma.$queryRaw`
      SELECT
        j.id AS id,
        j.nombre || ' ' || j.apellido AS nombre,
        d.nombre AS division,
        ej.promedio_bateo AS average,
        SUM(
          CASE
            WHEN (p.equipo_local_id = j.equipo_id AND p.score_local > p.score_visitante)
              OR (p.equipo_visitante_id = j.equipo_id AND p.score_visitante > p.score_local)
            THEN 1 ELSE 0
          END
        ) AS ganados,
        SUM(
          CASE
            WHEN (p.equipo_local_id = j.equipo_id AND p.score_local < p.score_visitante)
              OR (p.equipo_visitante_id = j.equipo_id AND p.score_visitante < p.score_local)
            THEN 1 ELSE 0
          END
        ) AS perdidos,
        ej.partidos_jugados AS total,
        e.nombre AS equipo,
        pos.nombre AS position
      FROM jugadores AS j
        JOIN jugadores_posicion AS jp
          ON jp.jugador_id = j.id
          AND jp.temporada_id = ${temporadaId}
        JOIN posiciones AS pos
          ON pos.id = jp.posicion_id
        JOIN estadisticas_jugador AS ej
          ON ej.jugador_id = j.id
          AND ej.temporada_id = ${temporadaId}
        JOIN partidos AS p
          ON p.equipo_local_id = j.equipo_id
             OR p.equipo_visitante_id = j.equipo_id
        JOIN equipos AS e
          ON e.id = j.equipo_id
        JOIN division AS d
          ON d.id = e.division_id
      WHERE pos.nombre <> 'pitcher'
      GROUP BY
        j.id, j.nombre, j.apellido, d.nombre,
        ej.promedio_bateo, ej.partidos_jugados,
        e.nombre, pos.nombre;
    `;
    res.json(fixBigInt(fielders));
  } catch (err) {
    console.error("Error al consultar Fielders por temporada:", err);
    res.status(500).json({ error: "No se pudo obtener Fielders" });
  }
});

// GET /stats/pitchers/:temporadaId
router.get("/stats/pitchers/:temporadaId", async (req, res) => {
  const temporadaId = parseInt(req.params.temporadaId, 10);

  try {
    const pitchers = await prisma.$queryRaw`
      SELECT
        j.id AS id,
        j.nombre || ' ' || j.apellido AS nombre,
        d.nombre AS division,
        ep.innings_lanzados AS average,
        SUM(
          CASE
            WHEN (p.equipo_local_id = j.equipo_id AND p.score_local > p.score_visitante)
              OR (p.equipo_visitante_id = j.equipo_id AND p.score_visitante > p.score_local)
            THEN 1 ELSE 0
          END
        ) AS ganados,
        SUM(
          CASE
            WHEN (p.equipo_local_id = j.equipo_id AND p.score_local < p.score_visitante)
              OR (p.equipo_visitante_id = j.equipo_id AND p.score_visitante < p.score_local)
            THEN 1 ELSE 0
          END
        ) AS perdidos,
        COUNT(ep.partido_id) AS total,
        e.nombre AS equipo
      FROM jugadores AS j
        JOIN jugadores_posicion AS jp
          ON jp.jugador_id = j.id
          AND jp.temporada_id = ${temporadaId}
        JOIN posiciones AS pos
          ON pos.id = jp.posicion_id
          AND pos.nombre = 'pitcher'
        JOIN estadisticas_pitcher AS ep
          ON ep.jugador_id = j.id
        JOIN partidos AS p
          ON p.id = ep.partido_id
        JOIN equipos AS e
          ON e.id = j.equipo_id
        JOIN division AS d
          ON d.id = e.division_id
      GROUP BY
        j.id, j.nombre, j.apellido, d.nombre, ep.innings_lanzados, e.nombre;
    `;
    res.json(fixBigInt(pitchers));
  } catch (err) {
    console.error("Error al consultar Pitchers por temporada:", err);
    res.status(500).json({ error: "No se pudo obtener Pitchers" });
  }
});

// GET /stats/atbat/:temporadaId
router.get("/stats/atbat/:temporadaId", async (req, res) => {
  const temporadaId = parseInt(req.params.temporadaId, 10);

  try {
    const atBat = await prisma.$queryRaw`
      SELECT
        j.id AS id,
        j.nombre || ' ' || j.apellido AS nombre,
        d.nombre AS division,
        ROUND(
          CAST(SUM(ep.hits) AS numeric) / NULLIF(COUNT(ep.jugador_id), 0),
          3
        ) AS average,
        SUM(
          CASE
            WHEN (p.equipo_local_id = j.equipo_id AND p.score_local > p.score_visitante)
              OR (p.equipo_visitante_id = j.equipo_id AND p.score_visitante > p.score_local)
            THEN 1 ELSE 0
          END
        ) AS ganados,
        SUM(
          CASE
            WHEN (p.equipo_local_id = j.equipo_id AND p.score_local < p.score_visitante)
              OR (p.equipo_visitante_id = j.equipo_id AND p.score_visitante < p.score_local)
            THEN 1 ELSE 0
          END
        ) AS perdidos,
        COUNT(ep.jugador_id) AS total,
        e.nombre AS equipo
      FROM jugadores AS j
        JOIN estadisticas_partido AS ep
          ON ep.jugador_id = j.id
        JOIN partidos AS p
          ON p.id = ep.partido_id
        JOIN torneos AS t
          ON p.torneo_id = t.id
          AND t.temporada_id = ${temporadaId}
        JOIN equipos AS e
          ON e.id = j.equipo_id
        JOIN division AS d
          ON d.id = e.division_id
      GROUP BY
        j.id, j.nombre, j.apellido, d.nombre, e.nombre;
    `;
    res.json(fixBigInt(atBat));
  } catch (err) {
    // Imprimimos el error real en consola
    console.error("Error SQL en /stats/atbat/:temporadaId →", err);
    res.status(500).json({ error: "No se pudo obtener At Bat" });
  }
});

module.exports = router;
