# Proyecto4-DB1

Sistema de gestión de Liga de Softball: aplicación web completa con base de datos relacional en PostgreSQL, backend en Node.js con Express y Prisma, y frontend en React.

## Características principales

- **Backend**: API REST con Node.js, Express y Prisma ORM
- **Frontend**: Aplicación React con interfaz moderna
- **Base de datos**: PostgreSQL con esquema completo de liga de softball
- **Funcionalidades**: Gestión de equipos, jugadores, torneos, estadísticas, rankings y más

## Estructura del proyecto

```bash
Proyecto4-DB1/
├── Backend/
│   ├── .env                     # Variables de entorno
│   ├── app.js                   # Servidor principal Express
│   ├── package.json             # Dependencias del backend
│   ├── prisma/
│   │   ├── schema.prisma        # Esquema Prisma
│   │   └── seed.js              # Datos de prueba (1000+ registros)
│   └── routes/                  # Rutas de la API
│       ├── arbitraje.js
│       ├── equipos.js
│       ├── jugadores.js
│       ├── torneos.js
│       ├── estadisticas*.js
│       └── cosasExtra.js        # Reportes y estadísticas
├── Frontend/
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   ├── context/             # Contextos (División, Temporada)
│   │   ├── pages/               # Páginas principales
│   │   ├── styles/              # Archivos CSS
│   │   └── assets/              # Recursos estáticos
│   ├── App.jsx                  # Configuración de rutas
│   ├── main.jsx                 # Punto de entrada
│   └── package.json             # Dependencias del frontend
└── README.md
```

## Requisitos previos

- **Node.js** ≥ 16
- **PostgreSQL** ≥ 12
- **npm** o **yarn**
- Cliente PostgreSQL (psql) o herramienta GUI como pgAdmin

## Instalación y configuración

### 1. Preparar la base de datos

```bash
# Crear la base de datos (ajusta credenciales según tu configuración)
createdb -U postgres Softball
```

### 2. Configurar el Backend

```bash
# Navegar al directorio del backend
cd Backend/

# Instalar dependencias
npm install

# Crear archivo .env con tu configuración
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:
```properties
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/Softball"
PORT=3001
```

```bash
# Sincronizar esquema con la base de datos
npx prisma db push

# Poblar con datos de prueba (opcional pero recomendado)
npx prisma db seed

# Iniciar el servidor backend
npm start
```

El backend estará corriendo en `http://localhost:3001`

### 3. Configurar el Frontend

```bash
# Navegar al directorio del frontend
cd ../Frontend/

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## Uso del sistema

### Funcionalidades principales

1. **Gestión de equipos y jugadores**
   - Crear, editar y eliminar equipos
   - Administrar jugadores por equipo
   - Asignar posiciones y roles

2. **Torneos y partidos**
   - Crear torneos por división y temporada
   - Programar partidos en el calendario
   - Registrar resultados y estadísticas

3. **Estadísticas y reportes**
   - Rankings de equipos por división
   - Estadísticas de bateo, pitcheo y fildeo
   - Exportación de reportes en CSV
   - Visualización de estadísticas por temporada

4. **Administración**
   - Gestión de temporadas y divisiones
   - Control de árbitros y entrenadores
   - Seguimiento de lesiones

### Navegación

- **Dashboard**: Vista principal con estadísticas generales
- **Equipos**: Gestión completa de equipos y jugadores
- **Calendario**: Programación y seguimiento de partidos
- **Estadísticas**: Rankings y reportes detallados
- **Administración**: Configuración del sistema

## API Endpoints principales

- `GET /api/equipos` - Lista de equipos
- `GET /api/jugadores/equipo/:id` - Jugadores por equipo
- `GET /api/partidos` - Partidos programados
- `GET /api/ranking_equipos_torneo` - Rankings
- `GET /api/cosas_extra/stats/*` - Estadísticas diversas

## Scripts útiles

### Backend
```bash
npm start          # Iniciar servidor
npm run dev        # Modo desarrollo con nodemon
npx prisma studio  # Interfaz web para la BD
npx prisma db push # Sincronizar esquema
npx prisma db seed # Poblar datos de prueba
```

### Frontend
```bash
npm run dev        # Servidor de desarrollo
npm run build      # Compilar para producción
npm run preview    # Vista previa de producción
```

## Solución de problemas comunes

1. **Error de conexión a la base de datos**
   - Verifica que PostgreSQL esté corriendo
   - Confirma las credenciales en el archivo `.env`
   - Asegúrate de que la base de datos existe

2. **Puerto ocupado**
   - El backend usa el puerto 3001 por defecto
   - El frontend usa el puerto 5173 por defecto
   - Cambia los puertos en caso de conflicto

3. **Problemas con Prisma**
   - Ejecuta `npx prisma generate` para regenerar el cliente
   - Usa `npx prisma db push` para sincronizar cambios

## Tecnologías utilizadas

- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **Frontend**: React, React Router, Context API
- **Estilos**: CSS personalizado con diseño responsive
- **Herramientas**: Vite, ESLint

## Contribución

Para contribuir al proyecto:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Realiza tus cambios
4. Envía un pull request

## Licencia

Este proyecto es de uso académico para el curso de Base de Datos 1.
