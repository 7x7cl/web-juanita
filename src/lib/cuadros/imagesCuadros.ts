export const images = import.meta.glob('./data/*/*.{jpg,jpeg,png,webp,gif,avif,svg}', {
	eager: true,
	import: 'default'
}) as Record<string, string>;
