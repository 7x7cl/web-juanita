# Las Artesanías de Juanita

Sitio web de artesanías bordadas en lana con técnica crewel, ahora en TanStack Start.

## Desarrollo

Instala dependencias y levanta el servidor local:

```bash
pnpm install
pnpm run dev
```

## Build de producción

```bash
pnpm run build
pnpm run preview
```

## Estilos

El proyecto usa Tailwind CSS. Los estilos globales están en `src/styles.css`.

## Rutas

TanStack Router usa rutas basadas en archivos dentro de `src/routes`. Para agregar una nueva página, crea un archivo `.tsx` en ese directorio.
