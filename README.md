# Proyecto4-DB1

Sistema de gestión de Softball: base de datos relacional en PostgreSQL, introspección con Prisma y backend en Node.js.

## Estructura del proyecto

```bash
Proyecto4-DB1/
├── Backend/
│   ├── .env                  # Variables de entorno
│   ├── Softball.sql          # DDL para crear la base de datos
│   ├── init.sql              # Scripts de datos de ejemplo
│   ├── prisma/
│   │   └── schema.prisma     # Esquema Prisma
│   └── generated/
│       └── prisma/           # Cliente Prisma generado
|── Frontend/
│   ├── src
|         └── assets          # Imágenes y tipos de letras
|         └── componets       # Componentes app
|         └── context         # Hoops app
|         └── pages           # Páginas app
|         └── styles          # CSS app
│   ├── App.jsx               # Rutas app
│   ├── main.jsx              # Crea app con sus contextos
└── README.md
```

## Requisitos

- Node.js ≥ 14  
- PostgreSQL  
- npm  

## Primeros pasos

1. Clona el repositorio y entra en el directorio del backend:  
   ```bash
   git clone <repo-url>
   cd Proyecto4-DB1/Backend
   ```
2. Crea la base de datos y aplica el esquema:  
   ```bash
   psql -U postgres -f Softball.sql
   ```
3. Inserta datos de ejemplo:  
   ```bash
   psql -U postgres -d Softball -f init.sql
   ```
4. Ajusta tu `.env` con la URL de conexión:  
   ```properties
   DATABASE_URL="postgresql://postgres:tu_password@localhost:5432/Softball"
   ```
5. Instala dependencias y sincroniza Prisma:  
   ```bash
   npm install
   npx prisma db pull
   npx prisma
      ```
6. Correr Frontend
   ```frontend
   cd Frontend
   npm dev run
   ```
