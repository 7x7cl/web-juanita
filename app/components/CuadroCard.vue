<script setup lang="ts">
const props = defineProps<{ cuadro: Cuadro }>();

const startLabel = computed(() => formatCuadroDate(props.cuadro.start));
const endLabel = computed(() => formatCuadroDate(props.cuadro.end));
</script>

<template>
	<NuxtLink :to="cuadro.path" class="animate-rise-delay-2 group block">
		<article>
			<div class="aspect-[5/4] overflow-hidden bg-linen-deep">
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
			<div class="pt-4">
				<h3
					class="font-serif text-xl font-semibold text-ink transition-colors group-hover:text-moss"
				>
					{{ cuadro.titulo }}
				</h3>
				<p v-if="startLabel" class="mt-1 text-sm text-muted">Empezado: {{ startLabel }}</p>
				<p v-if="endLabel" class="text-sm text-muted">Terminado: {{ endLabel }}</p>
				<p :class="['mt-2 text-sm font-medium', cuadro.vendido ? 'text-moss' : 'text-muted']">
					{{ cuadro.vendido ? 'Vendido' : 'Disponible' }}
				</p>
			</div>
		</article>
	</NuxtLink>
</template>
