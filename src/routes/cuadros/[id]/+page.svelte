<script lang="ts">
	import { images } from '$lib/cuadros/imagesCuadros';

	let { data } = $props();
	let { cuadro } = $derived(data);
</script>

<svelte:head>
	<title>{cuadro.titulo} - Cuadros crewel - Las Artesanías de Juanita</title>
</svelte:head>

<main class="flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 p-6">
	<h1 class="mb-6 text-4xl font-bold text-gray-800 drop-shadow-lg">{cuadro.titulo}</h1>
	<enhanced:img
		src={images[`./data/${cuadro.id}/${cuadro.portada}.jpg`].default}
		alt={cuadro.titulo}
		class="mb-6 max-w-xs rounded-lg border-4 border-white shadow-xl transition-transform duration-300 hover:scale-105"
		style="max-width: 400px;"
	/>
	<div class="flex flex-col items-center rounded-lg bg-white/80 px-6 py-4 shadow-md">
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
</main>
