# Las Artesanías de Juanita

Sitio web de artesanías bordadas en lana con técnica crewel, ahora en TanStack Start.

## Desarrollo

Instala dependencias y levanta el servidor local:

```bash
pnpm install
pnpm run dev
```

Antes de arrancar el dev server y antes del build, el proyecto genera automáticamente una versión WebP y una miniatura WebP para cada portada en `src/lib/cuadros/data/*/`.

## Build de producción

```bash
pnpm run build
pnpm run preview
```

Si necesitas regenerar manualmente los assets optimizados:

```bash
pnpm run generate:cuadros-assets
```

## Estilos

El proyecto usa Tailwind CSS. Los estilos globales están en `src/styles.css`.

## Rutas

TanStack Router usa rutas basadas en archivos dentro de `src/routes`. Para agregar una nueva página, crea un archivo `.tsx` en ese directorio.
