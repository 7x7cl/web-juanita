<script setup lang="ts">
import { Menu, X } from 'lucide-vue-next';

const route = useRoute();
const open = ref(false);

const pathname = computed(() => route.path.replace(/\/$/, '') || '/');

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
	<header class="sticky top-0 z-30 border-b border-border/70 bg-paper/85 backdrop-blur-md">
		<div class="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 md:px-6">
			<NuxtLink
				to="/"
				class="group font-serif text-xl font-semibold tracking-tight text-forest md:text-2xl"
			>
				<span class="transition-colors duration-200 group-hover:text-moss">{{ SITE_NAME }}</span>
			</NuxtLink>

			<nav class="hidden items-center gap-8 md:flex" aria-label="Principal">
				<NuxtLink
					v-for="link in NAV_LINKS"
					:key="link.href"
					:to="link.href"
					:class="[
						'relative text-sm font-medium tracking-wide transition-colors duration-200',
						isActive(link.href) ? 'text-forest' : 'text-muted hover:text-ink',
					]"
					:aria-current="isActive(link.href) ? 'page' : undefined"
				>
					{{ link.label }}
					<span
						v-if="isActive(link.href)"
						class="absolute -bottom-1 left-0 h-px w-full bg-thread"
						aria-hidden="true"
					/>
				</NuxtLink>
			</nav>

			<button
				type="button"
				class="p-2 text-ink-soft transition-colors duration-200 hover:text-forest md:hidden"
				:aria-label="open ? 'Cerrar menú' : 'Abrir menú'"
				:aria-expanded="open"
				aria-controls="mobile-menu"
				@click="open = !open"
			>
				<Menu v-if="!open" class="h-6 w-6" aria-hidden="true" />
				<X v-else class="h-6 w-6" aria-hidden="true" />
			</button>

			<div
				id="mobile-menu"
				v-show="open"
				class="absolute top-full right-4 z-40 mt-2 w-56 border border-border bg-paper p-2 shadow-lg md:hidden"
			>
				<NuxtLink
					v-for="link in NAV_LINKS"
					:key="link.href"
					:to="link.href"
					:class="[
						'block px-3 py-2.5 text-sm font-medium transition-colors duration-200',
						isActive(link.href)
							? 'bg-linen-deep text-forest'
							: 'text-ink-soft hover:bg-linen hover:text-ink',
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
		class="fixed inset-0 z-20 bg-ink/25 md:hidden"
		role="button"
		tabindex="-1"
		aria-label="Cerrar menú"
		@click="close"
	/>
</template>
