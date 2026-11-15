<script setup lang="ts">
import { ArrowLeft, ArrowRight, CalendarCheck, CalendarDays, MessageCircle, Ruler } from 'lucide-vue-next';

definePageMeta({
	key: (route) => route.fullPath,
});

const route = useRoute();

const { data } = await useAsyncData(`cuadro-${route.params.id}`, async () => {
	const docs = await queryCollection('cuadros').all();
	const cuadros = sortCuadros(docs.map(toCuadro));
	const index = cuadros.findIndex((c) => c.slug === route.params.id);
	if (index === -1) return null;
	return {
		cuadro: cuadros[index]!,
		prevId: index > 0 ? cuadros[index - 1]!.slug : null,
		nextId: index < cuadros.length - 1 ? cuadros[index + 1]!.slug : null,
	};
});

if (!data.value) {
	throw createError({ statusCode: 404, statusMessage: 'Cuadro no encontrado', fatal: true });
}

const cuadro = computed(() => data.value!.cuadro);
const prevId = computed(() => data.value!.prevId);
const nextId = computed(() => data.value!.nextId);

const startLabel = computed(() => formatCuadroDate(cuadro.value.start));
const endLabel = computed(() => formatCuadroDate(cuadro.value.end));
const imageAlt = computed(() => `${cuadro.value.titulo} — cuadro bordado crewel por Juanita`);

const img = useImage();
const previewSrc = computed(() =>
	img(cuadro.value.portada, { width: 1200, format: 'webp', quality: 80 }),
);
const fullSrc = computed(() =>
	img(cuadro.value.portada, { width: 2400, format: 'webp', quality: 82 }),
);
const ogImage = computed(
	() => `${SITE_URL}${img(cuadro.value.portada, { width: 1200, format: 'jpg', quality: 80 })}`,
);

const title = computed(
	() => `${cuadro.value.titulo} — Cuadro bordado crewel - Las Artesanías de Juanita`,
);
const description = computed(
	() =>
		`${cuadro.value.titulo} — cuadro bordado a mano en lana con técnica crewel por Juanita. Estado: ${cuadro.value.vendido ? 'Vendido' : 'Disponible'}.`,
);

useSeoMeta({
	title: title.value,
	description: description.value,
	ogType: 'article',
	ogTitle: title.value,
	ogDescription: description.value,
	ogImage: ogImage.value,
	twitterTitle: title.value,
	twitterDescription: description.value,
	twitterImage: ogImage.value,
});
</script>

<template>
	<section class="mx-auto max-w-[1120px] px-4 py-10 md:px-6 md:py-16">
		<NuxtLink to="/cuadros" class="enlace mb-8 inline-flex items-center gap-2 font-semibold">
			<ArrowLeft class="icono" stroke-width="2" aria-hidden="true" />
			Volver a cuadros
		</NuxtLink>

		<div class="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
			<div class="animate-rise-delay-1 rounded-md border-2 border-dashed border-azul-lana p-2 lg:sticky lg:top-8">
				<ImageLightbox
					:src="previewSrc"
					:full-src="fullSrc"
					:alt="imageAlt"
					:transition-name="`cuadro-${cuadro.slug}`"
				/>
			</div>

			<div class="animate-rise min-w-0">
				<p class="sobretitulo mb-2">Bordado crewel</p>
				<h1 class="titulo-1 mb-4">{{ cuadro.titulo }}</h1>

				<p class="mb-8">
					<span :class="['etiqueta', cuadro.vendido && 'etiqueta-vendido']">
						{{ cuadro.vendido ? 'Vendido' : 'Disponible' }}
					</span>
				</p>

				<dl class="tarjeta animate-rise-delay-2 grid gap-5">
					<div class="flex items-start gap-3">
						<Ruler class="icono mt-0.5 text-azul-lana" stroke-width="2" aria-hidden="true" />
						<div>
							<dt class="pequeno text-acero-oscuro">Medidas</dt>
							<dd class="font-semibold">
								{{ cuadro.measures.width }} cm × {{ cuadro.measures.height }} cm
							</dd>
						</div>
					</div>
					<div v-if="startLabel" class="flex items-start gap-3">
						<CalendarDays class="icono mt-0.5 text-azul-lana" stroke-width="2" aria-hidden="true" />
						<div>
							<dt class="pequeno text-acero-oscuro">Empezado</dt>
							<dd class="font-semibold">{{ startLabel }}</dd>
						</div>
					</div>
					<div v-if="endLabel" class="flex items-start gap-3">
						<CalendarCheck class="icono mt-0.5 text-azul-lana" stroke-width="2" aria-hidden="true" />
						<div>
							<dt class="pequeno text-acero-oscuro">Terminado</dt>
							<dd class="font-semibold">{{ endLabel }}</dd>
						</div>
					</div>
				</dl>

				<p class="animate-rise-delay-3 mt-8 max-w-[65ch]">
					Pieza única, bordada a mano en lana con técnica crewel. Toca la imagen para verla a
					pantalla completa.
				</p>

				<NuxtLink to="/contacto" class="boton boton-principal mt-6">
					<MessageCircle class="icono" stroke-width="2" aria-hidden="true" />
					{{ cuadro.vendido ? 'Coméntame qué te pareció' : 'Consultar por este cuadro' }}
				</NuxtLink>
			</div>
		</div>

		<nav
			class="puntada mt-14 flex items-center justify-between pt-8"
			aria-label="Navegación entre cuadros"
		>
			<NuxtLink
				v-if="prevId"
				:to="`/cuadros/${prevId}`"
				class="enlace inline-flex items-center gap-2 font-semibold"
			>
				<ArrowLeft class="icono" stroke-width="2" aria-hidden="true" />
				Anterior
			</NuxtLink>
			<span v-else />
			<NuxtLink
				v-if="nextId"
				:to="`/cuadros/${nextId}`"
				class="enlace inline-flex items-center gap-2 font-semibold"
			>
				Siguiente
				<ArrowRight class="icono" stroke-width="2" aria-hidden="true" />
			</NuxtLink>
		</nav>
	</section>
</template>
