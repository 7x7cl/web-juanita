<script lang="ts">
	import { page } from '$app/state';
	import '../app.css';

	let { children } = $props();

	const links = [
		{ href: '/', label: 'Inicio' },
		{ href: '/cuadros', label: 'Cuadros crewel' },
		/* { href: '/juanita', label: 'Sobre Juanita' },
		{ href: '/otras-artesanias', label: 'Otras artesanías' },
		 */ { href: '/contacto', label: 'Contacto' }
	];
</script>

<header
	class="sticky top-0 z-30 border-b border-gray-200/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
		<a href="/" class="flex items-center gap-2">
			<!-- 			<img src="/favicon.svg" alt="Logo" class="h-6 w-6" />
 -->
			<span
				class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-lg font-bold text-transparent"
				>Las Artesanías de Juanita</span
			>
		</a>
		<nav class="hidden gap-2 md:flex">
			{#each links as l}
				<a
					href={l.href}
					class="rounded-full px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 {page
						.url.pathname === l.href
						? 'bg-gray-900 text-white hover:bg-gray-900'
						: ''}"
					aria-current={page.url.pathname === l.href ? 'page' : undefined}
				>
					{l.label}
				</a>
			{/each}
		</nav>
	</div>
</header>

{@render children()}

<footer class="border-t border-gray-200/60 bg-white/60">
	<div
		class="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center text-sm text-gray-600"
	>
		<div class="mb-2 flex justify-center gap-6">
			<a
				href="mailto:lasartesaniasdejuanita@gmail.com"
				target="_blank"
				rel="noopener"
				aria-label="Gmail"
			>
				<img src="/logos/gmail.svg" alt="Gmail" class="h-5 w-5 transition hover:scale-110" />
			</a>
			<a href="https://wa.me/56999384690" target="_blank" rel="noopener" aria-label="WhatsApp">
				<img src="/logos/whatsapp.svg" alt="WhatsApp" class="h-5 w-5 transition hover:scale-110" />
			</a>
			<a
				href="https://www.instagram.com/lasartesaniasdejuanita/"
				target="_blank"
				rel="noopener"
				aria-label="Instagram"
			>
				<img
					src="/logos/instagram.svg"
					alt="Instagram"
					class="h-5 w-5 transition hover:scale-110"
				/>
			</a>
			<a
				href="https://www.facebook.com/lasartesaniasdejuanita"
				target="_blank"
				rel="noopener"
				aria-label="Facebook"
			>
				<img src="/logos/facebook.svg" alt="Facebook" class="h-5 w-5 transition hover:scale-110" />
			</a>
		</div>
		<p>© {new Date().getFullYear()} Las Artesanías de Juanita. Hecho con cariño en Chile.</p>
	</div>
</footer>
