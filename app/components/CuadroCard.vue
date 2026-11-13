<script setup lang="ts">
const props = defineProps<{ cuadro: Cuadro }>();

const startLabel = computed(() => formatCuadroDate(props.cuadro.start));
const endLabel = computed(() => formatCuadroDate(props.cuadro.end));
</script>

<template>
	<NuxtLink :to="cuadro.path" class="tarjeta animate-rise-delay-2 group block">
		<article>
			<div class="aspect-[5/4] overflow-hidden rounded-md bg-crema-tela">
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
					class="h-full w-full object-cover"
				/>
			</div>
			<div class="pt-4">
				<h3 class="titulo-3 group-hover:text-azul-hilo">
					{{ cuadro.titulo }}
				</h3>
				<p v-if="startLabel" class="pequeno mt-1 text-acero-oscuro">Empezado: {{ startLabel }}</p>
				<p v-if="endLabel" class="pequeno text-acero-oscuro">Terminado: {{ endLabel }}</p>
				<p class="mt-3">
					<span :class="['etiqueta', cuadro.vendido && 'etiqueta-vendido']">
						{{ cuadro.vendido ? 'Vendido' : 'Disponible' }}
					</span>
				</p>
			</div>
		</article>
	</NuxtLink>
</template>
