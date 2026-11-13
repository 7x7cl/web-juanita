import { queryCollection } from '@nuxt/content/server';

function escapeXml(value: string) {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export default defineEventHandler(async (event) => {
	const docs = await queryCollection(event, 'cuadros').all();
	const cuadros = sortCuadros(docs.map(toCuadro));

	const items = cuadros
		.map(
			(cuadro) => `    <item>
      <title>${escapeXml(cuadro.titulo)}</title>
      <link>${SITE_URL}${cuadro.path}</link>
      <guid isPermaLink="true">${SITE_URL}${cuadro.path}</guid>
      <description>${escapeXml(
				`${cuadro.titulo} — cuadro bordado a mano en lana con técnica crewel por Juanita.`,
			)}</description>
      <enclosure url="${SITE_URL}${cuadro.portada}" type="image/jpeg" />
    </item>`,
		)
		.join('\n');

	const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>es</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

	setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8');
	return feed;
});
