## Development

Start the dev server in background mode:

```sh
pnpm dev
```

Production build (fully static, prerendered to `.output/public`):

```sh
pnpm build
```

Preview the built site with `pnpm preview`. Deploy to Cloudflare with `wrangler deploy` (assets are served from `.output/public`).

## Content

Cuadros live in `content/cuadros/<slug>.md` (frontmatter only: `titulo`, `vendido`, `start`/`end`, `measures`) with the cover image at `public/img/cuadros/<slug>.jpg`. Display order is controlled by `CUADROS_ORDER` in `shared/utils/cuadros-order.ts`.

## Documentation

Full documentation: https://nuxt.com/docs

Consult these guides before working on related tasks:

- [Pages and routing](https://nuxt.com/docs/getting-started/routing)
- [Nuxt Content collections](https://content.nuxt.com/docs/collections/define)
- [SEO and meta tags](https://nuxt.com/docs/getting-started/seo-meta)
- [Nuxt Image](https://image.nuxt.com/get-started/usage)
- [Styling and Tailwind](https://nuxt.com/docs/getting-started/styling)
