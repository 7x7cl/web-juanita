<script setup lang="ts">
import { ArrowRight, HandHeart, Images, Leaf, MapPin, MessageCircle, Mountain } from 'lucide-vue-next';

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

const websiteSchema = JSON.stringify({
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: SITE_NAME,
	url: SITE_URL,
	description: SITE_DESCRIPTION,
	inLanguage: 'es',
});

useHead({
	script: [
		{ type: 'application/ld+json', innerHTML: personSchema },
		{ type: 'application/ld+json', innerHTML: websiteSchema },
	],
});

const { data: cuadros } = await useAsyncData('cuadros', async () => {
	const docs = await queryCollection('cuadros').all();
	return sortCuadros(docs.map(toCuadro));
});

const fotosOlmue = [
	{
		src: '/img/olmue/cerro-la-campana.jpg',
		alt: 'El cerro La Campana visto desde Olmué',
		autor: 'Carlos Figueroa Rojas',
		fuente: 'https://commons.wikimedia.org/wiki/File:Cerro_La_Campana,_Olmu%C3%A9_20211002.jpg',
	},
	{
		src: '/img/olmue/caballos-olmue.jpg',
		alt: 'Caballos en un campo de Olmué',
		autor: 'Carlos Figueroa Rojas',
		fuente: 'https://commons.wikimedia.org/wiki/File:Caballos,_Olmu%C3%A9_20210926.jpg',
	},
] as const;

const destacados = computed(() => (cuadros.value ?? []).slice(0, 3));
</script>

<template>
	<!-- Portada -->
	<section class="mx-auto max-w-[1120px] px-4 pt-6 pb-16 md:px-6 md:pt-10 md:pb-24">
		<div class="animate-rise mb-12 md:mb-16">
			<img
				src="/logo/artesanias-juanita.svg"
				:alt="SITE_NAME"
				width="920"
				height="300"
				class="mx-auto h-auto w-full max-w-[720px]"
			/>
		</div>

		<div class="grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16">
			<div class="animate-rise">
				<p class="sobretitulo mb-3 text-base leading-6 md:text-lg md:leading-7">
					Bordado crewel · Olmué, Chile
				</p>
				<h1 class="titulo-1 mb-4">Bordados crewel hechos a mano</h1>
				<span class="puntada-corta mb-6" aria-hidden="true" />
				<p class="mb-8 max-w-[65ch] text-lg leading-[28px]">
					Cada cuadro bordado en lana, puntada a puntada. Cada pieza es única y nace de la belleza
					de la naturaleza.
				</p>
				<div class="flex flex-wrap gap-3">
					<NuxtLink to="/cuadros" class="boton boton-principal">
						Ver cuadros
						<ArrowRight class="icono" stroke-width="2" aria-hidden="true" />
					</NuxtLink>
					<NuxtLink to="/contacto" class="boton boton-secundario">
						<MessageCircle class="icono" stroke-width="2" aria-hidden="true" />
						Escríbeme
					</NuxtLink>
				</div>
			</div>

			<div class="animate-rise-delay-1 mx-auto w-full max-w-[420px]">
				<div class="aspect-square rounded-circulo border-2 border-dashed border-azul-lana p-3">
					<NuxtImg
						src="/img/perfil.jpg"
						alt="Juanita bordando en su taller"
						format="webp"
						width="840"
						preload
						fetchpriority="high"
						decoding="async"
						class="h-full w-full rounded-circulo object-cover object-[62%_22%]"
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- Olmué -->
	<section class="bg-blanco-hilo" aria-labelledby="titulo-olmue">
		<div class="mx-auto max-w-[1120px] px-4 py-16 md:px-6">
			<div class="grid items-center gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-16">
				<div>
					<p class="sobretitulo mb-2 inline-flex items-center gap-2">
						<MapPin class="size-4 text-azul-lana" stroke-width="2" aria-hidden="true" />
						Mis raíces
					</p>
					<h2 id="titulo-olmue" class="titulo-2 mb-4">Orgullosa de ser olmueína</h2>
					<span class="puntada-corta mb-6" aria-hidden="true" />
					<p class="mb-4 max-w-[65ch] text-lg leading-[28px]">
						Vengo de Olmué, y toda mi familia viene de Olmué. Somos más de siete generaciones viviendo
						siempre en nuestra comuna.
					</p>
					<p class="mb-8 max-w-[65ch] text-lg leading-[28px]">
						Estoy orgullosa de ser olmueína, con mi cerro La Campana y su bella naturaleza.
					</p>

					<div class="flex flex-wrap items-center gap-6">
						<div
							class="flex size-32 shrink-0 flex-col items-center justify-center rounded-circulo border-2 border-dashed border-azul-lana bg-crema-tela text-center"
						>
							<span class="font-serif text-4xl leading-none font-bold text-azul-profundo">+7</span>
							<span class="pequeno mt-1 px-3 leading-[18px] text-azul-noche">generaciones en Olmué</span>
						</div>
						<ul class="space-y-2">
							<li class="flex items-center gap-2">
								<Mountain class="icono text-azul-lana" stroke-width="2" aria-hidden="true" />
								Cerro La Campana
							</li>
							<li class="flex items-center gap-2">
								<Leaf class="icono text-azul-lana" stroke-width="2" aria-hidden="true" />
								Su bella naturaleza
							</li>
						</ul>
					</div>
				</div>

				<div class="grid gap-6 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] sm:items-end">
					<figure
						v-for="(foto, index) in fotosOlmue"
						:key="foto.src"
						:class="['m-0', index === 1 && 'sm:mb-10']"
					>
						<div
							:class="[
								'overflow-hidden rounded-md',
								index === 0 ? 'border-2 border-dashed border-azul-lana p-2' : 'shadow-tarjeta',
							]"
						>
							<NuxtImg
								:src="foto.src"
								:alt="foto.alt"
								width="900"
								sizes="xs:100vw sm:50vw md:33vw"
								format="webp"
								quality="75"
								loading="lazy"
								decoding="async"
								:class="[
									'w-full rounded-md object-cover',
									index === 0 ? 'aspect-[4/5]' : 'aspect-square',
								]"
							/>
						</div>
						<figcaption class="mt-2 text-xs leading-[18px] text-acero-oscuro">
							Foto:
							<a :href="foto.fuente" target="_blank" rel="noopener" class="underline hover:text-azul-hilo">{{
								foto.autor
							}}</a>
							·
							<a
								href="https://creativecommons.org/licenses/by-sa/4.0/deed.es"
								target="_blank"
								rel="noopener license"
								class="underline hover:text-azul-hilo"
								>CC BY-SA 4.0</a
							>
							· Wikimedia Commons
						</figcaption>
					</figure>
				</div>
			</div>
		</div>
	</section>

	<!-- Sobre Juanita -->
	<section>
		<div class="mx-auto max-w-[1120px] px-4 py-16 md:px-6">
			<div class="mx-auto max-w-[65ch] text-center">
				<HandHeart class="mx-auto mb-4 size-8 text-azul-lana" stroke-width="2" aria-hidden="true" />
				<h2 class="titulo-2 animate-rise mb-4">Hecho con el corazón</h2>
				<p class="animate-rise-delay-1 text-lg leading-[28px]">
					Para mí el bordado crewel es una terapia. Me relaja y me deja plasmar la belleza de la
					naturaleza, y así cada pieza se vuelve una obra única bordada en lana.
				</p>
				<blockquote class="animate-rise-delay-2 mt-10 border-t-2 border-dashed border-azul-lana pt-8">
					<p class="font-serif text-xl leading-[32px] text-azul-profundo italic md:text-2xl md:leading-[36px]">
						“Busco transmitir en cada cuadro todos los buenos sentimientos y pensamientos positivos
						que llevo dentro.”
					</p>
					<cite class="pequeno mt-4 block not-italic text-acero-oscuro">— Juanita</cite>
				</blockquote>
			</div>
		</div>
	</section>

	<!-- Destacados -->
	<section class="bg-blanco-hilo">
		<div class="mx-auto max-w-[1120px] px-4 py-16 md:px-6">
			<div class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
				<div>
					<p class="sobretitulo mb-2">Galería</p>
					<h2 class="titulo-2 animate-rise">Cuadros destacados</h2>
					<p class="animate-rise-delay-1 mt-2 max-w-[65ch] text-acero-oscuro">
						Una selección de obras bordadas a mano en lana.
					</p>
				</div>
				<NuxtLink to="/cuadros" class="enlace inline-flex items-center gap-2 font-semibold">
					<Images class="icono" stroke-width="2" aria-hidden="true" />
					Ver galería completa
				</NuxtLink>
			</div>

			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				<CuadroCard v-for="cuadro in destacados" :key="cuadro.slug" :cuadro="cuadro" />
			</div>
		</div>
	</section>

	<!-- Llamado -->
	<section class="mx-auto max-w-[1120px] px-4 py-16 md:px-6">
		<div class="puntada mx-auto max-w-[720px] pt-16 text-center">
			<h2 class="titulo-2 mb-4">¿Te gusta alguna pieza?</h2>
			<p class="mx-auto mb-8 max-w-[50ch]">
				Escríbeme para consultar disponibilidad o coméntame qué te pareció.
			</p>
			<NuxtLink to="/contacto" class="boton boton-principal">
				Contactar
				<ArrowRight class="icono" stroke-width="2" aria-hidden="true" />
			</NuxtLink>
		</div>
	</section>
</template>
