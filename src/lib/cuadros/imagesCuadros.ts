export const images = import.meta.glob('./data/*/*.{jpg,jpeg,png,webp,gif,avif,svg}', {
	eager: true,
	import: 'default',
}) as Record<string, string | { src: string }>;

const ORIGINAL_EXTENSIONS = ['jpg', 'jpeg', 'png', 'avif', 'gif', 'svg', 'webp'] as const;

function toUrl(image: string | { src: string } | undefined) {
	if (!image) return undefined;
	if (typeof image === 'string') return image;
	return image.src;
}

function resolveImage(pathStem: string, extensions: readonly string[]) {
	for (const extension of extensions) {
		const image = toUrl(images[`${pathStem}.${extension}`]);
		if (image) {
			return image;
		}
	}

	return undefined;
}

export function getCuadroImageSources(id: string, portada = 'portada') {
	const pathStem = `./data/${id}/${portada}`;
	const original = resolveImage(pathStem, ORIGINAL_EXTENSIONS);
	const fullWebp = toUrl(images[`${pathStem}.webp`]);
	const thumbnailWebp = toUrl(images[`${pathStem}-thumb.webp`]);

	return {
		galleryWebp: thumbnailWebp ?? fullWebp,
		galleryFallback: original ?? thumbnailWebp ?? fullWebp,
		detailWebp: fullWebp,
		detailFallback: original ?? fullWebp,
		ogImage: original ?? fullWebp,
	};
}
