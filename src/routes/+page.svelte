<script lang="ts">
	import perfil from '$lib/fotos/perfil.jpg';
	import cuadroPortada from '$lib/fotos/cuadroPortada.jpg';
	const BASE_URL = typeof window !== 'undefined' ? window.location.origin : '';
	const TITLE = 'Las Artesanías de Juanita';
	const DESCRIPTION =
		'Artesanías bordadas en lana con técnica crewel, hechas a mano en Chile por Juanita. Descubre colores, texturas y tradición en cada puntada.';
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:type" content="website" />
	{#if BASE_URL}
		<meta property="og:url" content={`${BASE_URL}/`} />
	{/if}
	<meta property="og:image" content="/favicon.svg" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={TITLE} />
	<meta name="twitter:description" content={DESCRIPTION} />
	<meta name="twitter:image" content="/favicon.svg" />
</svelte:head>

<section
	class="relative overflow-hidden bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100"
>
	<div class="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:items-center">
		<div>
			<h1 class="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
				Artesanías bordadas en lana, técnica crewel
			</h1>
			<p class="mb-8 text-lg leading-relaxed text-gray-700">
				Piezas únicas hechas a mano por Juanita. Colores, texturas y tradición en cada puntada.
			</p>
			<div class="flex flex-wrap gap-3">
				<a href="/cuadros" class="rounded-full bg-gray-900 px-6 py-3 text-white hover:bg-black"
					>Ver cuadros</a
				>
				<!-- <a
					href="/juanita"
					class="rounded-full border border-gray-300 bg-white px-6 py-3 text-gray-800 hover:bg-gray-50"
					>Conocer a Juanita</a
				> -->
			</div>
		</div>
		<div class="relative">
			<img
				src={perfil}
				alt="Foto de Juanita"
				loading="lazy"
				class="aspect-square w-full rounded-3xl object-cover shadow-xl"
			/>
		</div>
	</div>
</section>

<section class="mx-auto max-w-6xl px-4 py-16">
	<h2 class="mb-6 text-2xl font-bold text-gray-900">Destacados</h2>
	<div class="grid gap-6 md:grid-cols-3">
		<a href="/cuadros" class="group overflow-hidden rounded-2xl border bg-white shadow-sm">
			<div
				class="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200"
			>
				<img
					src={cuadroPortada}
					alt="Cuadro destacado"
					loading="lazy"
					class="h-full w-full rounded-t-2xl object-cover transition duration-300 group-hover:scale-105"
				/>
			</div>
			<div class="p-4">
				<h3 class="font-semibold group-hover:underline">Cuadros crewel</h3>
				<p class="text-sm text-gray-600">Galería de obras</p>
			</div>
		</a>
		<!-- <a href="/otras-artesanias" class="group overflow-hidden rounded-2xl border bg-white shadow-sm">
			<div class="aspect-[4/3] bg-gradient-to-br from-amber-200 to-rose-200"></div>
			<div class="p-4">
				<h3 class="font-semibold group-hover:underline">Otras artesanías</h3>
				<p class="text-sm text-gray-600">Tejidos, bordados y más</p>
			</div>
		</a>
		<a href="/contacto" class="group overflow-hidden rounded-2xl border bg-white shadow-sm">
			<div class="aspect-[4/3] bg-gradient-to-br from-sky-200 to-emerald-200"></div>
			<div class="p-4">
				<h3 class="font-semibold group-hover:underline">Contacto</h3>
				<p class="text-sm text-gray-600">Consulta o encarga tu pieza</p>
			</div>
		</a> -->
	</div>
</section>

<section class="bg-gray-50">
	<div class="mx-auto max-w-6xl px-4 py-16">
		<div class="grid gap-8 md:grid-cols-2 md:items-center">
			<div>
				<h2 class="mb-3 text-2xl font-bold text-gray-900">Hecho con el corazón</h2>
				<p class="text-gray-700">
					Como artesana, el bordado es una terapia que me relaja y me permite plasmar la belleza de
					la naturaleza, transformando cada pieza en una obra única.
				</p>
			</div>
			<div class="rounded-2xl border bg-white p-6 shadow-sm">
				<p class="text-gray-700">
					“Busco transmitir en cada cuadro todos los buenos sentimientos y pensamientos positivos
					que llevo dentro” — Juanita
				</p>
			</div>
		</div>
	</div>
</section>
