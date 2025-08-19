<script lang="ts">
	import { images } from '$lib/cuadros/imagesCuadros';
	import { goto } from '$app/navigation';
	import { CUADROS } from '$lib/cuadros';

	let { data } = $props();
	let { cuadro } = $derived(data);
	const BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';
	const TITLE = $derived(`${cuadro.titulo} - Cuadros crewel - Las Artesanías de Juanita`);
	const DESCRIPTION = $derived(
		`${cuadro.titulo} — obra bordada en lana con técnica crewel. ${cuadro.vendido ? 'Estado: Vendido.' : 'Estado: Disponible.'}`
	);
	const OG_IMAGE = $derived(
		images[`./data/${cuadro.id}/${cuadro.portada}.jpg`]?.default?.img?.src ?? ''
	);

	const currentIndex = $derived(CUADROS.findIndex((c) => c === cuadro.id));
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:type" content="article" />
	{#if BASE_URL}
		<meta property="og:url" content={`${BASE_URL}/cuadros/${cuadro.id}`} />
	{/if}
	{#if OG_IMAGE}
		<meta property="og:image" content={BASE_URL ? `${BASE_URL}${OG_IMAGE}` : OG_IMAGE} />
	{/if}
	<!-- JSON-LD Product/CreativeWork simplificado -->
	<script type="application/ld+json">
		{JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'CreativeWork',
			name: cuadro.titulo,
			image: BASE_URL ? `${BASE_URL}/cuadros/${cuadro.id}/portada.jpg` : undefined,
			description: DESCRIPTION,
			url: BASE_URL ? `${BASE_URL}/cuadros/${cuadro.id}` : undefined,
			inLanguage: 'es',
			isAccessibleForFree: true
		})}
	</script>
</svelte:head>

<main class="flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-6">
	<h1 class="mb-6 text-4xl font-bold text-gray-800 drop-shadow-lg">{cuadro.titulo}</h1>
	<enhanced:img
		src={images[`./data/${cuadro.id}/${cuadro.portada}.jpg`].default}
		alt={cuadro.titulo}
		loading="lazy"
		class="mb-6 max-w-xs rounded-lg border-4 border-white shadow-xl transition-transform duration-300 hover:scale-105"
		style="max-width: 400px;"
	/>
	<div class="flex flex-col items-center rounded-lg bg-white/80 px-6 py-4 shadow-md">
		<p class="mb-2 text-lg font-medium text-gray-700">
			Medidas: {cuadro.measures.width}cm x {cuadro.measures.height}cm
		</p>
		{#if cuadro.start?.year}
			<p class="mb-4 text-sm text-gray-600">
				Fecha de creación:
				{#if cuadro.start.day}{cuadro.start.day}/{/if}
				{#if cuadro.start.month}{cuadro.start.month}/{/if}
				{cuadro.start.year}
			</p>
		{/if}
		{#if cuadro.end?.year}
			<p class="mb-4 text-sm text-gray-600">
				Fecha de finalización:
				{#if cuadro.end.day}{cuadro.end.day}/{/if}
				{#if cuadro.end.month}{cuadro.end.month}/{/if}
				{cuadro.end.year}
			</p>
		{/if}
		<p
			class="mt-2 rounded-full px-4 py-2 text-base font-semibold"
			class:!bg-green-100={!cuadro.vendido}
			class:!bg-red-100={cuadro.vendido}
			class:!text-green-700={!cuadro.vendido}
			class:!text-red-700={cuadro.vendido}
		>
			{cuadro.vendido ? 'Vendido' : 'Disponible'}
		</p>
	</div>

	<div class="mt-8 flex w-full justify-between">
		<a
			href={currentIndex > 0 ? `/cuadros/${CUADROS[currentIndex - 1]}` : null}
			class="rounded-lg bg-blue-500 px-6 py-3 text-white shadow-lg transition-colors duration-300 hover:bg-blue-600 disabled:opacity-50 {currentIndex ===
			0
				? 'pointer-events-none opacity-50'
				: ''}"
		>
			Anterior
		</a>
		<a
			href={currentIndex < CUADROS.length - 1 ? `/cuadros/${CUADROS[currentIndex + 1]}` : null}
			class="rounded-lg bg-blue-500 px-6 py-3 text-white shadow-lg transition-colors duration-300 hover:bg-blue-600 disabled:opacity-50 {currentIndex ===
			CUADROS.length - 1
				? 'pointer-events-none opacity-50'
				: ''}"
		>
			Siguiente
		</a>
	</div>
</main>
