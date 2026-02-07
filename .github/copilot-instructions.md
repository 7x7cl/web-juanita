# Copilot Instructions for Las Artesanías de Juanita (TanStack Start)

## Arquitectura y Estructura

- Proyecto TanStack Start (React) con TypeScript, TailwindCSS y Vite.
- Estructura principal:
  - `src/routes/`: Rutas de la app (páginas React, layout raíz y endpoints server-side).
  - `src/lib/`: Lógica reutilizable, datos y utilidades (ej: `cuadros/` para galería de obras).
  - `public/`: Archivos estáticos accesibles públicamente (ej: logos, imágenes).
- Navegación y layout definidos en `src/routes/__root.tsx`.
- Galería de cuadros: `/cuadros` y `/cuadros/$id` usan datos de `src/lib/cuadros/`.

## Flujos de Desarrollo

- Instala dependencias: `pnpm install`.
- Servidor de desarrollo: `pnpm run dev`.
- Build producción: `pnpm run build` y previsualiza con `pnpm run preview`.
- No hay tests automatizados configurados por defecto ni se necesitan.

## Convenciones y Patrones

- Usa componentes React y layouts para reutilización y consistencia visual.
- Datos de cuadros en `src/lib/cuadros/data/{id}/data.json` y portada en `{id}/portada.jpg`.
- Importa imágenes con alias (`@/lib/fotos/`, `@/lib/cuadros/imagesCuadros`).
- Navegación principal definida en el array `links` de `src/routes/__root.tsx`.
- Estado de venta de cuadros: campo `vendido` en los datos JSON.
- Contacto y redes sociales: centralizados en `/contacto` y en el footer del layout.
- Linting: ESLint + Prettier, configuración en `eslint.config.js`.

## Integraciones y Dependencias

- TailwindCSS y plugin typography: ver `src/styles.css`.
- Iconos Lucide: importados en layouts.
- No hay backend propio ni base de datos; los datos son archivos JSON locales.
- Despliegue: requiere configurar el entorno de TanStack Start según el destino (ver README).

## Ejemplos de Patrones

- Para agregar un nuevo cuadro:
  1. Crea carpeta en `src/lib/cuadros/data/{nuevo-id}/`.
  2. Agrega `data.json` y `portada.jpg`.
  3. Añade el id en el array `CUADROS` de `src/lib/cuadros/index.ts`.
- Para agregar una nueva página, crea un archivo `.tsx` en `src/routes/{nueva-pagina}.tsx`.

## Archivos Clave

- `src/routes/__root.tsx`: layout global y navegación.
- `src/lib/cuadros/index.ts`: lógica y datos de galería.
- `src/styles.css`: estilos globales y Tailwind.
- `README.md`: instrucciones básicas de uso y despliegue.
