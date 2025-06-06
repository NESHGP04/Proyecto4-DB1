/**
 * Archivo: prisma/seed.js
 *
 * Este script pobla la base de datos con al menos 1000 registros distribuidos
 * coherentemente entre las tablas definidas en tu esquema Prisma.
 *
 * Para ejecutarlo:
 * 1) Asegúrate de que en package.json tengas:
 *    "prisma": {
 *      "seed": "node prisma/seed.js"
 *    }
 * 2) Corre `npx prisma db push` o `npx prisma migrate dev` según tu flujo.
 * 3) Ejecuta `npm run prisma:seed` (o `npx prisma db seed`).
 */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomElement(arr) {
  return arr[getRandomInt(0, arr.length - 1)];
}
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

async function main() {
  console.log("🌱 Iniciando seed...");

  // 1) DIVISIONES
  const divisionNames = ["Norte", "Sur", "Este", "Oeste"];
  const divisions = [];
  for (const name of divisionNames) {
    const div = await prisma.division.create({
      data: {
        nombre: name,
        descripcion: `Division ${name} de la liga`,
      },
    });
    divisions.push(div);
  }

  // 2) ESTADIOS
  const stadiumNames = [
    "Estadio Central",
    "Arena Nacional",
    "Coliseo Norte",
    "Campo Estrella",
    "Parque Real",
  ];
  const stadiums = [];
  for (let i = 0; i < stadiumNames.length; i++) {
    const st = await prisma.estadios.create({
      data: {
        nombre: stadiumNames[i],
        ubicacion: `Ciudad ${getRandomElement(["A", "B", "C", "D", "E"])}`,
        capacidad: getRandomInt(5000, 20000),
      },
    });
    stadiums.push(st);
  }

  // 3) TEMPORADAS
  const seasonData = [
    {
      nombre: "Temporada 2022",
      fecha_inicio: new Date("2022-01-01"),
      fecha_fin: new Date("2022-12-31"),
    },
    {
      nombre: "Temporada 2023",
      fecha_inicio: new Date("2023-01-01"),
      fecha_fin: new Date("2023-12-31"),
    },
    {
      nombre: "Temporada 2024",
      fecha_inicio: new Date("2024-01-01"),
      fecha_fin: new Date("2024-12-31"),
    },
    {
      nombre: "Temporada 2025",
      fecha_inicio: new Date("2025-01-01"),
      fecha_fin: new Date("2025-12-31"),
    },
  ];
  const seasons = [];
  for (const sd of seasonData) {
    const ts = await prisma.temporadas.create({
      data: sd,
    });
    seasons.push(ts);
  }

  // 4) CALENDARIO (12 fechas por temporada)
  for (const ts of seasons) {
    for (let m = 1; m <= 12; m++) {
      const date = new Date(
        ts.fecha_inicio.getFullYear(),
        m - 1,
        getRandomInt(1, 28)
      );
      await prisma.calendario.create({
        data: {
          temporada_id: ts.id,
          fecha: date,
          descripcion: `Evento calendario mes ${m} - ${ts.nombre}`,
        },
      });
    }
  }

  // 5) POSICIONES
  const positionNames = [
    "pitcher",
    "catcher",
    "primera_base",
    "segunda_base",
    "tercera_base",
    "shortstop",
    "jardinero_izquierdo",
    "jardinero_central",
    "jardinero_derecho",
    "designado",
  ];
  const positions = [];
  for (const posName of positionNames) {
    const pos = await prisma.posiciones.create({
      data: {
        nombre: posName,
        descripcion: `Posicion ${posName.replace("_", " ")}`,
      },
    });
    positions.push(pos);
  }

  // 6) EQUIPOS y ENTRENADORES
  const teamNames = [
    "Condores",
    "Halcones",
    "Tigres",
    "Leones",
    "Acereros",
    "Piratas",
    "Gigantes",
    "Delfines",
    "Toros",
    "Rebeldes",
    "Guerreros",
    "Rangers",
    "Dragones",
    "Panteras",
    "Cazadores",
    "Imperiales",
    "Centinelas",
    "Fenix",
    "Bufalos",
    "Libertadores",
    "Paladines",
    "Nomadas",
    "Centauros",
    "Aguilas",
    "Cobras",
    "Escorpiones",
    "Mapaches",
    "Zorros",
    "Panteras2",
    "Orangutanes",
  ];
  const cities = [
    "Ciudad Azul",
    "Villa Verde",
    "Puerto Dorado",
    "Monte Plata",
    "Valle Rojo",
  ];
  const teams = [];
  for (let i = 0; i < teamNames.length; i++) {
    const division = getRandomElement(divisions);
    const tm = await prisma.equipos.create({
      data: {
        nombre: teamNames[i],
        ciudad: getRandomElement(cities),
        fecha_creacion: randomDate(new Date(2000, 0, 1), new Date()),
        division_id: division.id,
      },
    });
    teams.push(tm);

    // Crear 1 entrenador por equipo
    await prisma.entrenadores.create({
      data: {
        nombre: getRandomElement([
          "Juan",
          "Pedro",
          "Luis",
          "Carlos",
          "Miguel",
          "Adrian",
          "Andres",
          "Diego",
        ]),
        apellido: getRandomElement([
          "Gomez",
          "Lopez",
          "Martinez",
          "Perez",
          "Ramirez",
        ]),
        // Uso del valor exacto del enum rol_entrenador_enum:
        rol: getRandomElement([
          "principal",
          "asistente",
          "analista",
          "preparador_f_sico",
        ]),
        equipo_id: tm.id,
        correo: `entrenador${tm.id}@liga.com`,
      },
    });
  }

  // 7) JUGADORES y JUGADORES_POSICION
  const firstNames = [
    "Jose",
    "Maria",
    "Miguel",
    "Ana",
    "Carlos",
    "Laura",
    "David",
    "Lucia",
    "Pablo",
    "Sofia",
  ];
  const lastNames = [
    "Garcia",
    "Rodriguez",
    "Hernandez",
    "Martinez",
    "Lopez",
    "Gonzalez",
    "Perez",
    "Ramirez",
  ];
  const players = [];
  for (let i = 0; i < 200; i++) {
    const equipo = getRandomElement(teams);
    const jugador = await prisma.jugadores.create({
      data: {
        nombre: getRandomElement(firstNames),
        apellido: getRandomElement(lastNames),
        fecha_nacimiento: randomDate(
          new Date(1980, 0, 1),
          new Date(2005, 0, 1)
        ),
        genero: getRandomElement(["M", "F", "O"]),
        equipo_id: equipo.id,
        nacionalidad: getRandomElement([
          "Guatemala",
          "Mexico",
          "Estados Unidos",
          "Colombia",
          "Argentina",
        ]),
      },
    });
    players.push(jugador);

    // Asignar posicion para cada temporada
    for (const ts of seasons) {
      const pos = getRandomElement(positions);
      await prisma.jugadores_posicion.create({
        data: {
          jugador_id: jugador.id,
          posicion_id: pos.id,
          temporada_id: ts.id,
        },
      });
    }
  }

  // 8) ARBITROS
  const referees = [];
  for (let i = 0; i < 30; i++) {
    const arb = await prisma.arbitros.create({
      data: {
        nombre: getRandomElement(firstNames),
        apellido: getRandomElement(lastNames),
        nivel: getRandomElement(["A", "B", "C", "D"]),
        correo: `arbitro${i + 1}@liga.com`,
      },
    });
    referees.push(arb);
  }

  // 9) TORNEOS
  const tournaments = [];
  for (const division of divisions) {
    for (const ts of seasons) {
      const tor = await prisma.torneos.create({
        data: {
          nombre: `${division.nombre} Cup ${ts.nombre.split(" ")[1]}`,
          temporada_id: ts.id,
          division_id: division.id,
          fecha_inicio: ts.fecha_inicio,
          fecha_fin: ts.fecha_fin,
          estado: getRandomElement(["activo", "finalizado"]),
        },
      });
      tournaments.push(tor);
    }
  }

  // 10) PARTIDOS
  const matches = [];
  for (let i = 0; i < 100; i++) {
    // Seleccionar dos equipos distintos
    let home = getRandomElement(teams);
    let away = getRandomElement(teams);
    while (away.id === home.id) {
      away = getRandomElement(teams);
    }
    const tor = getRandomElement(tournaments);
    const estadio = getRandomElement(stadiums);

    const fechaHora = randomDate(new Date(2022, 0, 1), new Date());

    const scoreLocal = getRandomInt(0, 10);
    const scoreVisitante = getRandomInt(0, 10);

    const part = await prisma.partidos.create({
      data: {
        torneo_id: tor.id,
        equipo_local_id: home.id,
        equipo_visitante_id: away.id,
        fecha_hora: fechaHora,
        resultado:
          scoreLocal > scoreVisitante
            ? "ganado"
            : scoreLocal < scoreVisitante
            ? "perdido"
            : "empate",
        score_local: scoreLocal,
        score_visitante: scoreVisitante,
        estadio_id: estadio.id,
      },
    });
    matches.push(part);

    // 2 arbitros por partido
    const selectedRefs = [];
    while (selectedRefs.length < 2) {
      const r = getRandomElement(referees);
      if (!selectedRefs.includes(r)) selectedRefs.push(r);
    }
    for (const r of selectedRefs) {
      await prisma.arbitraje.create({
        data: {
          partido_id: part.id,
          arbitro_id: r.id,
          rol: getRandomElement(["principal", "asistente"]),
        },
      });
    }
  }

  // 11) ESTADISTICAS_JUGADOR (un registro por jugador por temporada)
  for (const jugador of players) {
    for (const ts of seasons) {
      const pj = getRandomInt(10, 60);
      const avg = parseFloat((Math.random() * 0.5 + 0.2).toFixed(3));
      const hr = getRandomInt(0, 30);
      const carreras = getRandomInt(0, 80);
      await prisma.estadisticas_jugador.create({
        data: {
          jugador_id: jugador.id,
          temporada_id: ts.id,
          partidos_jugados: pj,
          promedio_bateo: avg,
          homeruns: hr,
          carreras_anotadas: carreras,
        },
      });
    }
  }

  // 12) ESTADISTICAS_PARTIDO (unos cuantos stats por partido para “At Bat”)
  for (const part of matches) {
    // Elegir 3 jugadores aleatorios para batear en este partido
    const bateadores = [];
    while (bateadores.length < 3) {
      const p = getRandomElement(players);
      if (!bateadores.includes(p)) bateadores.push(p);
    }
    for (const b of bateadores) {
      const hits = getRandomInt(0, 4);
      const carreras = getRandomInt(0, 3);
      const bases = getRandomInt(0, 2);
      const errores = getRandomInt(0, 1);
      const strikeouts = getRandomInt(0, 3);
      await prisma.estadisticas_partido.create({
        data: {
          partido_id: part.id,
          jugador_id: b.id,
          hits,
          carreras,
          bases,
          errores,
          strikeouts,
          innings_lanzados: 0,
          carreras_permitidas: 0,
          ponches: 0,
          bases_por_bola: 0,
        },
      });
    }
  }

  // 13) ESTADISTICAS_PITCHER (un pitcher por partido)
  for (const part of matches) {
    // Para simplificar, tomamos un jugador aleatorio y lo tratamos como pitcher
    const picher = getRandomElement(players);
    const innings = parseFloat((Math.random() * 5 + 1).toFixed(2));
    const ponches = getRandomInt(0, 8);
    const carrerasPerm = getRandomInt(0, 6);
    const bb = getRandomInt(0, 4);
    const hitsPerm = getRandomInt(0, 6);
    await prisma.estadisticas_pitcher.create({
      data: {
        partido_id: part.id,
        jugador_id: picher.id,
        innings_lanzados: innings,
        ponches,
        carreras_permitidas: carrerasPerm,
        bases_por_bola: bb,
        hits_permitidos: hitsPerm,
      },
    });
  }

  // 14) RANKING_EQUIPOS_TORNEO (todos los equipos en cada torneo)
  for (const tor of tournaments) {
    // Obtener equipos de la misma division
    const equiposDivision = teams.filter(
      (e) => e.division_id === tor.division_id
    );
    for (const e of equiposDivision) {
      const pgan = getRandomInt(0, 20);
      const pperd = getRandomInt(0, 20);
      const pemp = getRandomInt(0, 5);
      await prisma.ranking_equipos_torneo.create({
        data: {
          torneo_id: tor.id,
          equipo_id: e.id,
          division_id: tor.division_id,
          puntos: pgan * 3 + pemp,
          partidos_ganados: pgan,
          partidos_perdidos: pperd,
          partidos_empatados: pemp,
        },
      });
    }
  }

  // 15) FOTOS_JUGADORES (una foto por cada 2 jugadores, aprox.)
  for (let i = 0; i < players.length; i += 2) {
    const player = players[i];
    await prisma.fotos_jugadores.create({
      data: {
        jugador_id: player.id,
        url: `https://fotos.jugadores.com/${player.id}.jpg`,
        descripcion: `Foto de ${player.nombre} ${player.apellido}`,
      },
    });
  }

  // 16) SANCIONES (alrededor de 20 registros)
  for (let i = 0; i < 20; i++) {
    const targetPlayer = getRandomElement(players);
    const start = randomDate(new Date(2022, 0, 1), new Date());
    const end = new Date(start);
    end.setDate(start.getDate() + getRandomInt(5, 30));
    await prisma.sanciones.create({
      data: {
        jugador_id: targetPlayer.id,
        equipo_id: null,
        fecha_inicio: start,
        fecha_fin: end,
        motivo: getRandomElement(["Falta grave", "Indisciplina", "Dopaje"]),
        tipo_sancion: getRandomElement(["3 juegos", "multas", "suspension"]),
      },
    });
  }

  // 17) LESIONES (alrededor de 20 registros)
  for (let i = 0; i < 20; i++) {
    const targetPlayer = getRandomElement(players);
    const start = randomDate(new Date(2021, 0, 1), new Date());
    const end =
      Math.random() > 0.5
        ? new Date(start.getTime() + getRandomInt(5, 60) * 24 * 60 * 60 * 1000)
        : null;
    await prisma.lesiones.create({
      data: {
        jugador_id: targetPlayer.id,
        fecha_inicio: start,
        fecha_fin: end,
        tipo: getRandomElement(["Distension", "Fractura", "Torcedura"]),
        descripcion: `Lesion de tipo ${getRandomElement([
          "leve",
          "moderada",
          "grave",
        ])}`,
      },
    });
  }

  console.log("✅ Seed completado con exito.");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
