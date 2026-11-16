<script setup lang="ts">
const route = useRoute();

const canonicalUrl = computed(() => `${SITE_URL}${route.path.replace(/\/$/, '') || '/'}`);

const organizationSchema = JSON.stringify({
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: SITE_NAME,
	description:
		'Artesana especializada en bordado crewel. Cuadros únicos bordados a mano en lana con técnica crewel en Chile.',
	url: SITE_URL,
	logo: `${SITE_URL}/logo/logo-jl-circulo.svg`,
	sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook, SOCIAL_LINKS.whatsapp],
});

useHead(() => ({
	htmlAttrs: { lang: 'es' },
	link: [
		{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
		{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
		{ rel: 'sitemap', href: '/sitemap.xml' },
		{
			rel: 'alternate',
			type: 'application/rss+xml',
			title: SITE_TITLE,
			href: `${SITE_URL}/rss.xml`,
		},
		{ rel: 'canonical', href: canonicalUrl.value },
	],
	meta: [
		{ property: 'og:url', content: canonicalUrl.value },
		{ name: 'theme-color', content: '#FAF5EA' },
	],
	script: [{ type: 'application/ld+json', innerHTML: organizationSchema }],
}));

useSeoMeta({
	title: SITE_TITLE,
	description: SITE_DESCRIPTION,
	keywords: SITE_KEYWORDS,
	robots: 'index,follow',
	author: SITE_NAME,
	ogSiteName: SITE_NAME,
	ogType: 'website',
	ogLocale: 'es_CL',
	ogImage: `${SITE_URL}/og-image.jpg`,
	ogImageWidth: 1200,
	ogImageHeight: 630,
	ogImageAlt: 'Las Artesanías de Juanita — bordados crewel hechos a mano en Chile',
	twitterCard: 'summary_large_image',
	twitterImage: `${SITE_URL}/og-image.jpg`,
	twitterImageAlt: 'Las Artesanías de Juanita — bordados crewel hechos a mano en Chile',
});
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
