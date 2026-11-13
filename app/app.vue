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
	logo: `${SITE_URL}/favicon.svg`,
	sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.facebook, SOCIAL_LINKS.whatsapp],
});

useHead(() => ({
	htmlAttrs: { lang: 'es' },
	link: [
		{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
		{ rel: 'icon', href: '/favicon.ico' },
		{ rel: 'sitemap', href: '/sitemap.xml' },
		{
			rel: 'alternate',
			type: 'application/rss+xml',
			title: SITE_TITLE,
			href: `${SITE_URL}/rss.xml`,
		},
		{ rel: 'canonical', href: canonicalUrl.value },
	],
	meta: [{ property: 'og:url', content: canonicalUrl.value }],
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
	ogImage: `${SITE_URL}/favicon.svg`,
	twitterCard: 'summary_large_image',
});
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
