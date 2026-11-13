# Las Artesanías de Juanita

Sitio web estático construido con [Nuxt](https://nuxt.com) — galería de cuadros de bordado crewel hechos a mano.

```sh
pnpm install
```

## 🚀 Project Structure

```text
├── app/                  # Código de la aplicación (pages, components, layouts, assets)
├── content/cuadros/      # Un archivo .md por cuadro (frontmatter con título, medidas, fechas)
├── public/img/cuadros/   # Imagen de portada por cuadro (<slug>.jpg)
├── server/routes/        # Rutas Nitro (rss.xml)
├── shared/utils/         # Constantes y helpers compartidos app/servidor
├── content.config.ts     # Colección `cuadros` (Nuxt Content + Zod)
└── nuxt.config.ts
```

## 🧞 Commands

| Command          | Action                                          |
| :--------------- | :---------------------------------------------- |
| `pnpm dev`       | Servidor de desarrollo en `localhost:3000`      |
| `pnpm build`     | Genera el sitio estático en `.output/public/`   |
| `pnpm preview`   | Previsualiza el build de producción             |
| `wrangler deploy`| Despliega `.output/public` a Cloudflare         |

## 📝 Añadir un cuadro

1. Crea `content/cuadros/<slug>.md` con el frontmatter (`titulo`, `vendido`, `measures`, `start`/`end` opcionales).
2. Copia la imagen a `public/img/cuadros/<slug>.jpg`.
3. Añade el `<slug>` a `CUADROS_ORDER` en `shared/utils/cuadros-order.ts` para fijar su posición.
