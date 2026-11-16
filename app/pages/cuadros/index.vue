<script setup lang="ts">
const TITLE = 'Cuadros Bordados Crewel - Las Artesanías de Juanita';
const DESCRIPTION =
	'Galería de cuadros bordados en lana con técnica crewel. Piezas únicas de bordado crewel hechas a mano por Juanita en Chile.';

useSeoMeta({
	title: TITLE,
	description: DESCRIPTION,
	ogTitle: TITLE,
	ogDescription: DESCRIPTION,
	twitterTitle: TITLE,
	twitterDescription: DESCRIPTION,
});

const { data: cuadros } = await useAsyncData('cuadros', async () => {
	const docs = await queryCollection('cuadros').all();
	return sortCuadros(docs.map(toCuadro));
});

const itemListSchema = computed(() =>
	JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Cuadros de bordado crewel',
		inLanguage: 'es',
		itemListElement: (cuadros.value ?? []).map((cuadro, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: cuadro.titulo,
			url: `${SITE_URL}${cuadro.path}`,
		})),
	}),
);

useHead(() => ({
	script: [{ type: 'application/ld+json', innerHTML: itemListSchema.value }],
}));
</script>

<template>
	<section class="mx-auto max-w-[1120px] px-4 py-16 md:px-6">
		<header class="mb-10 max-w-[65ch]">
			<p class="sobretitulo mb-2">Galería</p>
			<h1 class="titulo-1 animate-rise mb-4">Cuadros de bordado crewel</h1>
			<span class="puntada-corta mb-6" aria-hidden="true" />
			<p class="animate-rise-delay-1 text-lg leading-[28px]">
				Estos son mis cuadros, bordados a mano con técnica crewel. Si alguno te gusta,
				<NuxtLink to="/contacto" class="enlace">escríbeme</NuxtLink> para saber si está disponible
				o para contarme qué te pareció.
			</p>
		</header>

		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
			<CuadroCard v-for="cuadro in cuadros" :key="cuadro.slug" :cuadro="cuadro" />
		</div>
	</section>
</template>
