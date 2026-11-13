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
</script>

<template>
	<section class="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
		<header class="mb-12 max-w-2xl">
			<h1
				class="animate-rise mb-4 font-serif text-4xl font-semibold tracking-tight text-ink md:text-5xl"
			>
				Cuadros de bordado crewel
			</h1>
			<p class="animate-rise-delay-1 text-lg leading-relaxed text-ink-soft">
				Explora una selección de cuadros únicos bordados a mano con técnica crewel. Si te
				interesa alguna obra, contáctanos para disponibilidad y encargos.
			</p>
		</header>

		<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
			<CuadroCard v-for="cuadro in cuadros" :key="cuadro.slug" :cuadro="cuadro" />
		</div>
	</section>
</template>
