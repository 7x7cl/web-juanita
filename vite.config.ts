import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		},
		tsconfigPaths: true
	},
	plugins: [
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
				autoSubfolderIndex: true,
				autoStaticPathsDiscovery: true,
				crawlLinks: true
			}
		}),
		viteReact()
	]
});
