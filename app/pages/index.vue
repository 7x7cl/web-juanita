<script setup lang="ts">
const personSchema = JSON.stringify({
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: 'Juanita',
	jobTitle: 'Artesana de bordado crewel',
	description:
		'Artesana chilena especializada en bordado crewel. Crea cuadros únicos bordados a mano en lana con la tradicional técnica crewel.',
	url: SITE_URL,
	knowsAbout: [
		'Bordado crewel',
		'Crewel embroidery',
		'Arte textil',
		'Bordado en lana',
		'Artesanía chilena',
	],
});

useHead({
	script: [{ type: 'application/ld+json', innerHTML: personSchema }],
});

const { data: cuadros } = await useAsyncData('cuadros', async () => {
	const docs = await queryCollection('cuadros').all();
	return sortCuadros(docs.map(toCuadro));
});

const destacados = computed(() => (cuadros.value ?? []).slice(0, 3));
const delayClasses = ['animate-rise', 'animate-rise-delay-1', 'animate-rise-delay-2'] as const;
</script>

<template>
	<section class="relative min-h-[min(88vh,52rem)] overflow-hidden bg-[#1a2820]">
		<div class="absolute inset-0 md:left-[42%]">
			<NuxtImg
				src="/img/perfil.jpg"
				alt=""
				format="webp"
				preload
				class="animate-hero-image h-full w-full object-cover object-[62%_22%]"
				fetchpriority="high"
				decoding="async"
				aria-hidden="true"
			/>
			<div
				class="absolute inset-0 bg-[linear-gradient(to_right,#1a2820_0%,rgb(26_40_32/0.82)_18%,rgb(26_40_32/0.5)_40%,rgb(26_40_32/0.22)_65%,rgb(26_40_32/0.06)_85%,transparent_100%)] max-md:bg-[linear-gradient(to_top,#1a2820_0%,rgb(26_40_32/0.75)_35%,rgb(26_40_32/0.3)_65%,transparent_100%)]"
				aria-hidden="true"
			/>
		</div>

		<div
			class="relative mx-auto flex min-h-[min(88vh,52rem)] max-w-6xl flex-col justify-end px-4 pb-14 pt-24 md:justify-center md:px-6 md:pb-20 md:pt-28"
		>
			<div class="max-w-xl">
				<p
					class="animate-rise mb-4 font-serif text-4xl leading-[1.05] font-semibold tracking-tight text-[#f7f8f4] sm:text-5xl md:text-6xl lg:text-7xl"
				>
					{{ SITE_NAME }}
				</p>
				<h1
					class="animate-rise-delay-1 text-lg font-medium tracking-wide text-[#eef1ea] sm:text-xl md:text-2xl"
				>
					Bordados crewel hechos a mano
				</h1>
				<span
					class="animate-underline mt-5 mb-6 block h-px w-24 origin-left bg-[#c4a35a]"
					aria-hidden="true"
				/>
				<p
					class="animate-rise-delay-2 mb-8 max-w-md text-base leading-relaxed text-[#dce3d6] md:text-lg"
				>
					Cuadros únicos bordados en lana, puntada a puntada, con la belleza de la naturaleza.
				</p>
				<div class="animate-rise-delay-3">
					<NuxtLink
						to="/cuadros"
						class="inline-flex items-center gap-2 border border-[#eef1ea]/50 bg-[#f7f8f4] px-7 py-3.5 text-sm font-semibold tracking-wide text-[#243d32] transition-all duration-300 hover:border-[#c4a35a] hover:bg-[#c4a35a] hover:text-[#1a2820]"
					>
						Ver cuadros crewel
						<span aria-hidden="true">→</span>
					</NuxtLink>
				</div>
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
		<div class="mx-auto max-w-2xl text-center">
			<h2 class="animate-rise mb-5 font-serif text-3xl font-semibold text-ink md:text-4xl">
				Hecho con el corazón
			</h2>
			<p class="animate-rise-delay-1 text-lg leading-relaxed text-ink-soft md:text-xl">
				Como artesana del bordado crewel, esta técnica es una terapia que me relaja y me permite
				plasmar la belleza de la naturaleza, transformando cada pieza en una obra única bordada en
				lana.
			</p>
			<blockquote
				class="animate-rise-delay-2 mt-10 font-serif text-xl italic leading-relaxed text-moss md:text-2xl"
			>
				“Busco transmitir en cada cuadro todos los buenos sentimientos y pensamientos positivos
				que llevo dentro.”
				<cite class="mt-4 block font-sans text-sm not-italic tracking-wide text-muted"
					>— Juanita</cite
				>
			</blockquote>
		</div>
	</section>

	<section class="border-y border-border bg-paper/60">
		<div class="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-24">
			<div class="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
				<div>
					<h2 class="animate-rise font-serif text-3xl font-semibold text-ink md:text-4xl">
						Cuadros destacados
					</h2>
					<p class="animate-rise-delay-1 mt-2 max-w-lg text-ink-soft">
						Una selección de obras bordadas a mano en lana con técnica crewel.
					</p>
				</div>
				<NuxtLink
					to="/cuadros"
					class="animate-rise-delay-1 text-sm font-semibold tracking-wide text-moss transition-colors hover:text-forest"
				>
					Ver galería completa →
				</NuxtLink>
			</div>

			<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				<NuxtLink
					v-for="(cuadro, index) in destacados"
					:key="cuadro.slug"
					:to="cuadro.path"
					:class="['group block', delayClasses[index]]"
				>
					<div class="aspect-[4/5] overflow-hidden bg-linen-deep">
						<NuxtImg
							:src="cuadro.portada"
							:alt="`${cuadro.titulo} — cuadro bordado crewel`"
							width="800"
							sizes="xs:100vw sm:50vw lg:33vw"
							format="webp"
							quality="75"
							loading="lazy"
							decoding="async"
							:style="{ viewTransitionName: `cuadro-${cuadro.slug}` }"
							class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
						/>
					</div>
					<div class="mt-4">
						<h3
							class="font-serif text-xl font-semibold text-ink transition-colors group-hover:text-moss"
						>
							{{ cuadro.titulo }}
						</h3>
						<p class="mt-1 text-sm text-muted">
							{{ cuadro.vendido ? 'Vendido' : 'Disponible' }}
						</p>
					</div>
				</NuxtLink>
			</div>
		</div>
	</section>

	<section class="mx-auto max-w-6xl px-4 py-20 text-center md:px-6 md:py-28">
		<h2 class="animate-rise mb-4 font-serif text-3xl font-semibold text-ink md:text-4xl">
			¿Te enamora alguna pieza?
		</h2>
		<p class="animate-rise-delay-1 mx-auto mb-8 max-w-md text-ink-soft">
			Escríbeme para consultas, disponibilidad o encargos personalizados.
		</p>
		<NuxtLink
			to="/contacto"
			class="animate-rise-delay-2 inline-flex items-center gap-2 bg-forest px-7 py-3.5 text-sm font-semibold tracking-wide text-linen transition-colors duration-300 hover:bg-moss"
		>
			Contactar
			<span aria-hidden="true">→</span>
		</NuxtLink>
	</section>
</template>
