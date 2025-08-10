import { CUADROS } from '$lib/cuadros';

const SITE = (import.meta as any).env?.PUBLIC_BASE_URL || '';

export const prerender = true;

export const GET = async () => {
    const urls: string[] = [
        '/',
        '/cuadros',
        '/contacto',
        // '/juanita', '/otras-artesanias' // habilitar si se publican
    ];

    for (const id of CUADROS) {
        urls.push(`/cuadros/${id}`);
    }

    const now = new Date().toISOString();
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
            .map(
                (u) => `  <url>
    <loc>${SITE ? SITE + u : u}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u === '/' ? '1.0' : '0.7'}</priority>
  </url>`
            )
            .join('\n')}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml; charset=UTF-8',
            'Cache-Control': 'max-age=3600, s-maxage=3600'
        }
    });
};
