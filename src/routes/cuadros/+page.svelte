<script lang="ts">
	import { images } from '$lib/cuadros/imagesCuadros';

	let { data } = $props();
	let { cuadros } = $derived(data);
	const TITLE = 'Cuadros crewel - Las Artesanías de Juanita';
	const DESCRIPTION =
		'Galería de cuadros bordados en lana (técnica crewel). Piezas únicas hechas a mano por Juanita.';
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:type" content="website" />
</svelte:head>

<section class="mx-auto max-w-6xl px-4 py-12">
	<h1 class="mb-6 text-3xl font-bold">Cuadros de lana bordada crewel</h1>
	<p class="mb-8 max-w-2xl text-gray-700">
		Explora una selección de piezas únicas. Si te interesa alguna obra, contáctanos para
		disponibilidad y encargos.
	</p>

	<div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
		{#each cuadros as c}
			<a
				href={`/cuadros/${c.id}`}
				class="block overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md"
			>
				<article>
					<div class="aspect-[5/4] bg-gradient-to-br from-purple-100 to-pink-100">
						{#if images[`./data/${c.id}/${c.portada}.jpg`]}
							<enhanced:img
								src={images[`./data/${c.id}/${c.portada}.jpg`].default}
								alt={c.titulo}
								class="h-full w-full object-cover"
							/>
						{/if}
					</div>
					<div class="p-4">
						<h3 class="font-semibold">{c.titulo}</h3>
						{#if c.start}
							<p>
								Empezado: {#if c.start.month}{c.start.month}/{/if}{c.start.year}
							</p>
						{/if}
						{#if c.end}
							<p>
								Terminado: {#if c.end.month}{c.end.month}/{/if}{c.end.year}
							</p>
						{/if}
						<div class="mt-3 flex items-center justify-between text-sm text-gray-700">
							<span class={c.vendido ? 'text-emerald-700' : 'text-gray-500'}>
								{c.vendido ? 'Vendido' : 'Disponible'}
							</span>
						</div>
					</div>
				</article>
			</a>
		{/each}
	</div>
</section>
