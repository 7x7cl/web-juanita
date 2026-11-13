import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxt/content', '@nuxt/fonts', '@nuxt/image', '@nuxtjs/sitemap'],

	css: ['~/assets/css/main.css'],

	site: {
		url: 'https://example.com',
		name: 'Las Artesanías de Juanita',
	},

	fonts: {
		families: [
			{
				name: 'Cormorant Garamond',
				provider: 'google',
				weights: [500, 600, 700],
				styles: ['normal', 'italic'],
				subsets: ['latin', 'latin-ext'],
			},
			{
				name: 'Outfit',
				provider: 'google',
				weights: [400, 500, 600, 700],
				subsets: ['latin', 'latin-ext'],
			},
		],
	},

	experimental: {
		viewTransition: true,
	},

	vite: {
		plugins: [tailwindcss()],
	},

	nitro: {
		prerender: {
			routes: ['/rss.xml'],
		},
	},
});
