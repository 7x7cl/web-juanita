<script setup lang="ts">
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
	<section class="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-16">
		<NuxtLink
			to="/cuadros"
			class="mb-8 inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-moss"
		>
			← Volver a cuadros
		</NuxtLink>

		<div class="grid items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
			<div class="animate-rise-delay-1 lg:sticky lg:top-28">
				<ImageLightbox
					:src="previewSrc"
					:full-src="fullSrc"
					:alt="imageAlt"
					:transition-name="`cuadro-${cuadro.slug}`"
				/>
			</div>

			<div class="animate-rise min-w-0">
				<p class="mb-3 text-xs font-semibold tracking-[0.18em] text-moss uppercase">
					Bordado crewel
				</p>
				<h1
					class="font-serif text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-4xl md:text-5xl"
				>
					{{ cuadro.titulo }}
				</h1>
				<span class="mt-5 mb-8 block h-px w-16 bg-thread" aria-hidden="true" />

				<p
					:class="[
						'mb-8 inline-flex items-center border px-3 py-1.5 text-sm font-semibold tracking-wide',
						cuadro.vendido
							? 'border-border bg-linen-deep text-moss'
							: 'border-thread/50 bg-[rgb(196_163_90/0.12)] text-ink',
					]"
				>
					{{ cuadro.vendido ? 'Vendido' : 'Disponible' }}
				</p>

				<dl class="animate-rise-delay-2 grid gap-5 border-t border-border pt-8 sm:grid-cols-2">
					<div>
						<dt class="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Medidas</dt>
						<dd class="mt-1.5 text-lg text-ink">
							{{ cuadro.measures.width }} cm × {{ cuadro.measures.height }} cm
						</dd>
					</div>
					<div v-if="startLabel">
						<dt class="text-xs font-semibold tracking-[0.14em] text-muted uppercase">Inicio</dt>
						<dd class="mt-1.5 text-lg text-ink">{{ startLabel }}</dd>
					</div>
					<div v-if="endLabel">
						<dt class="text-xs font-semibold tracking-[0.14em] text-muted uppercase">
							Finalización
						</dt>
						<dd class="mt-1.5 text-lg text-ink">{{ endLabel }}</dd>
					</div>
				</dl>

				<p class="animate-rise-delay-3 mt-8 max-w-md text-base leading-relaxed text-ink-soft">
					Pieza única bordada a mano en lana con técnica crewel. Toca la imagen para verla a
					pantalla completa.
				</p>
			</div>
		</div>

		<nav
			class="mt-14 flex items-center justify-between border-t border-border pt-8"
			aria-label="Navegación entre cuadros"
		>
			<NuxtLink
				v-if="prevId"
				:to="`/cuadros/${prevId}`"
				class="text-sm font-semibold text-ink transition-colors hover:text-moss"
			>
				← Anterior
			</NuxtLink>
			<span v-else class="text-sm text-border">← Anterior</span>
			<NuxtLink
				v-if="nextId"
				:to="`/cuadros/${nextId}`"
				class="text-sm font-semibold text-ink transition-colors hover:text-moss"
			>
				Siguiente →
			</NuxtLink>
			<span v-else class="text-sm text-border">Siguiente →</span>
		</nav>
	</section>
</template>
