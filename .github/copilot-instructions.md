# Copilot Instructions for Las Artesanías de Juanita (SvelteKit)

## Arquitectura y Estructura

- Proyecto SvelteKit con TypeScript, TailwindCSS y Vite.
- Estructura principal:
  - `src/routes/`: Rutas de la app (páginas Svelte, layouts, endpoints server-side).
  - `src/lib/`: Lógica reutilizable, datos y utilidades (ej: `cuadros/` para galería de obras).
  - `static/`: Archivos estáticos accesibles públicamente (ej: logos, imágenes).
- Navegación y layout definidos en `src/routes/+layout.svelte` y `+layout.ts`.
- Galería de cuadros: `/cuadros` y `/cuadros/[id]` usan datos de `src/lib/cuadros/`.

## Flujos de Desarrollo

- Instala dependencias: `pnpm install`.
- Servidor de desarrollo: `pnpm run dev`.
- Build producción: `pnpm run build` y previsualiza con `pnpm run preview`.
- No hay tests automatizados configurados por defecto ni se necesitan.

## Convenciones y Patrones

- Usa componentes Svelte y layouts para reutilización y consistencia visual.
- Datos de cuadros en `src/lib/cuadros/data/{id}/data.json` y portada en `{id}/portada.jpg`.
- Importa imágenes con alias (`$lib/fotos/`, `$lib/cuadros/imagesCuadros`).
- Navegación principal definida en el array `links` de `+layout.svelte`.
- Estado de venta de cuadros: campo `vendido` en los datos JSON.
- Contacto y redes sociales: centralizados en `/contacto` y en el footer del layout.
- Linting: ESLint + Prettier, configuración en `eslint.config.js`.

## Integraciones y Dependencias

- TailwindCSS y plugin typography: ver `src/app.css`.
- Iconos Lucide: importados en layouts.
- No hay backend propio ni base de datos; los datos son archivos JSON locales.
- Despliegue: requiere configurar un adapter SvelteKit según el destino (ver README).

## Ejemplos de Patrones

- Para agregar un nuevo cuadro:
  1. Crea carpeta en `src/lib/cuadros/data/{nuevo-id}/`.
  2. Agrega `data.json` y `portada.jpg`.
  3. Añade el id en el array `CUADROS` de `src/lib/cuadros/index.ts`.
- Para agregar una nueva página, crea un archivo Svelte en `src/routes/{nueva-pagina}/+page.svelte`.

## Archivos Clave

- `src/routes/+layout.svelte` y `+layout.ts`: layout global, navegación, prerender.
- `src/lib/cuadros/index.ts`: lógica y datos de galería.
- `src/app.css`: estilos globales y Tailwind.
- `README.md`: instrucciones básicas de uso y despliegue.
