import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/content', '@nuxt/fonts', '@nuxt/image', '@nuxtjs/sitemap'],

	css: ['~/assets/css/main.css'],

	site: {
		url: 'https://www.lasartesaniasdejuanita.cl',
		name: 'Las Artesanías de Juanita',
		description:
			'Bordados crewel hechos a mano en Chile por Juanita. Cuadros únicos bordados en lana con técnica crewel.',
		defaultLocale: 'es',
	},

	fonts: {
		// Cursiva de la marca para «Juanita» (antes dependía de fuentes del sistema).
		families: [{ name: 'Pinyon Script', provider: 'google', weights: [400], subsets: ['latin'] }],
	},

	experimental: {
		viewTransition: true,
	},

	vite: {
		plugins: [tailwindcss()],
	},

	nitro: {
		// Force fully static output — Cloudflare Workers CI would otherwise
		// auto-detect cloudflare_module and generate a worker entry point.
		preset: 'static',
		prerender: {
			routes: ['/rss.xml'],
		},
	},
});
