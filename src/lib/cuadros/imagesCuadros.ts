export const images = import.meta.glob('./data/*/*.{jpg,jpeg,png,webp,gif,avif,svg}', {
	eager: true,
	import: 'default'
}) as Record<string, string>;

const ORIGINAL_EXTENSIONS = ['jpg', 'jpeg', 'png', 'avif', 'gif', 'svg', 'webp'] as const;

function resolveImage(pathStem: string, extensions: readonly string[]) {
	for (const extension of extensions) {
		const image = images[`${pathStem}.${extension}`];
		if (image) {
			return image;
		}
	}

	return undefined;
}

export function getCuadroImageSources(id: string, portada = 'portada') {
	const pathStem = `./data/${id}/${portada}`;
	const original = resolveImage(pathStem, ORIGINAL_EXTENSIONS);
	const fullWebp = images[`${pathStem}.webp`];
	const thumbnailWebp = images[`${pathStem}-thumb.webp`];

	return {
		galleryWebp: thumbnailWebp ?? fullWebp,
		galleryFallback: original ?? thumbnailWebp ?? fullWebp,
		detailWebp: fullWebp,
		detailFallback: original ?? fullWebp,
		ogImage: original ?? fullWebp
	};
}
