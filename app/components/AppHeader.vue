<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next';

const route = useRoute();
const open = ref(false);

const pathname = computed(() => route.path.replace(/\/$/, '') || '/');
// En la portada el logo va grande en el contenido, no en el encabezado.
const isHome = computed(() => pathname.value === '/');

function isActive(href: string) {
	return pathname.value === href || (href !== '/' && pathname.value.startsWith(href));
}

function close() {
	open.value = false;
}

function onKeydown(event: KeyboardEvent) {
	if (event.key === 'Escape') close();
}

watch(() => route.fullPath, close);
onMounted(() => document.addEventListener('keydown', onKeydown));
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
</script>

<template>
	<header class="puntada-abajo relative z-30 bg-crema-tela">
		<div class="relative mx-auto flex max-w-[1120px] items-center justify-between gap-4 px-4 py-3 md:px-6">
			<NuxtLink
				v-if="!isHome"
				to="/"
				class="block shrink-0"
				:aria-label="`${SITE_NAME} — Inicio`"
			>
				<img
					src="/logo/artesanias-juanita.svg"
					alt=""
					width="920"
					height="300"
					class="h-auto w-[240px] md:w-[300px]"
				/>
			</NuxtLink>

			<nav class="ms-auto hidden items-center gap-2 md:flex" aria-label="Principal">
				<NuxtLink
					v-for="link in NAV_LINKS"
					:key="link.href"
					:to="link.href"
					:class="[
						'rounded-circulo px-4 py-2 font-semibold text-azul-profundo transition-colors duration-200',
						isActive(link.href)
							? 'bg-azul-claro text-azul-noche'
							: 'hover:text-azul-hilo hover:underline hover:underline-offset-4',
					]"
					:aria-current="isActive(link.href) ? 'page' : undefined"
				>
					{{ link.label }}
				</NuxtLink>
			</nav>

			<button
				type="button"
				class="ms-auto rounded-circulo p-2 text-azul-profundo transition-colors duration-200 hover:bg-azul-claro md:hidden"
				:aria-label="open ? 'Cerrar menú' : 'Abrir menú'"
				:aria-expanded="open"
				aria-controls="mobile-menu"
				@click="open = !open"
			>
				<Menu v-if="!open" class="size-6" stroke-width="2" aria-hidden="true" />
				<X v-else class="size-6" stroke-width="2" aria-hidden="true" />
			</button>

			<div
				id="mobile-menu"
				v-show="open"
				class="absolute top-full right-4 z-40 mt-2 w-60 rounded-md border border-crema-borde bg-blanco-hilo p-2 shadow-tarjeta md:hidden"
			>
				<NuxtLink
					v-for="link in NAV_LINKS"
					:key="link.href"
					:to="link.href"
					:class="[
						'block rounded-sm px-3 py-2.5 font-semibold transition-colors duration-200',
						isActive(link.href)
							? 'bg-azul-claro text-azul-noche'
							: 'text-azul-profundo hover:bg-crema-tela hover:text-azul-hilo',
					]"
					:aria-current="isActive(link.href) ? 'page' : undefined"
					@click="close"
				>
					{{ link.label }}
				</NuxtLink>
			</div>
		</div>
	</header>

	<div
		v-show="open"
		class="fixed inset-0 z-20 bg-azul-noche/25 md:hidden"
		role="button"
		tabindex="-1"
		aria-label="Cerrar menú"
		@click="close"
	/>
</template>
