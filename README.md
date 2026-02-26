
[![E2E](https://github.com/<owner>/<repo>/actions/workflows/e2e.yml/badge.svg)](https://github.com/<owner>/<repo>/actions/workflows/e2e.yml)

# Revestidas (clone)

Tienda demo para subir y mostrar productos con imágenes. Proyecto full-stack con:

- Backend: NestJS + TypeORM + PostgreSQL (Docker)
- Frontend: React + TypeScript + Vite + Tailwind CSS
- Autenticación admin por cookie (JWT)
- Subida de imágenes (multer, almacenamiento local `uploads/`)

## Estado

Versión de desarrollo: app funcional localmente con Docker Compose, pruebas E2E con Playwright y seeds para datos de ejemplo.

## Requisitos

- Docker & Docker Compose
- Node.js (>=18) y npm
- Opcional: `npx` / `pnpm`

## Quick start (con Docker Compose - development only)

1. Levantar servicios de desarrollo (API + Postgres):

```bash
# usa el compose de desarrollo explícito
docker compose -f docker-compose.dev.yml up --build -d
```

2. (Una vez que la API esté lista) ejecutar seeds dentro del contenedor API:

```bash
docker compose -f docker-compose.dev.yml exec api npm run seed:admin
docker compose -f docker-compose.dev.yml exec api npm run seed:products
```

3. Frontend de desarrollo (si prefieres correrlo local fuera de Docker):

```bash
cd frontend
npm install
npm run dev
```

4. Acceder:
- Frontend: http://localhost:3000 (o 3001 si 3000 está ocupado)
- API (dev container): http://localhost:4002/api

## Desarrollo local (backend)

```bash
cd backend
npm install
cp .env.example .env
# editar .env (JWT_SECRET, DATABASE_URL, etc.)
npm run start:dev
```

## Seeds

- `npm run seed:admin` crea un admin por defecto (email: `admin@revestidas.local`, cambia la contraseña en producción).
- `npm run seed:products` inserta productos de ejemplo que muestran la galería.

## Tests E2E (Playwright)

Instalar dependencias y ejecutar tests localmente desde la carpeta del `frontend`:

```bash
cd frontend
npm install
npx playwright install
npx playwright test --project=chromium
```

CI:

- Hay un workflow de GitHub Actions `.github/workflows/e2e.yml` que ejecuta los tests E2E en CI.
- Reemplaza `<owner>/<repo>` en el badge arriba por tu repositorio para mostrar el estado en README.

Notas:
- Asegúrate de que la API esté ejecutándose y accesible en `http://localhost:4000/api` antes de lanzar los tests localmente.

## Archivos importantes

- Backend: `backend/` (entidades en `backend/src/entities`, controladores en `backend/src/*`)
- Frontend: `frontend/` (páginas en `frontend/src/pages`, componentes en `frontend/src/components`)
- Uploads (host): `uploads/` (montado desde el contenedor)
- Docker Compose (development): `docker-compose.dev.yml`

## Variables de entorno

- Revisa `backend/.env.example` y define al menos:
	- `DATABASE_URL`
	- `JWT_SECRET` (cambiar en producción)

## Troubleshooting

- Error "Cannot find module 'cookie-parser'": dentro de `backend` ejecutar `npm install cookie-parser` y reiniciar el contenedor o rebuild de la imagen.
- Si la API no conecta a Postgres comprueba `DATABASE_URL` y que el servicio `db` esté levantado.
- Archivos subidos aparecen en `uploads/` en la raíz del repo (montaje de Docker). Asegura permisos de escritura.

## Siguientes pasos recomendados

- Cambiar `JWT_SECRET` por uno seguro en producción.
- Mover el almacenamiento de imágenes a S3/CDN para producción.
- Añadir migraciones de TypeORM en lugar de `synchronize: true`.

## Contribuir

Pull requests bienvenidos. Para cambios grandes, abre un issue primero para discutir el plan.

## Licencia

Proyecto de ejemplo — revisa la licencia del repo original antes de usar en producción.
