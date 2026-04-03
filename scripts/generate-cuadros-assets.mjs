import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const DATA_DIR = path.resolve('src/lib/cuadros/data');
const SOURCE_PATTERN = /^portada\.(jpe?g|png|webp|avif|gif)$/i;
const FULL_SIZE_WIDTH = 1600;
const THUMB_WIDTH = 640;
const FULL_SIZE_QUALITY = 82;
const THUMB_QUALITY = 72;

async function walkDirectories(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const nestedDirectories = await Promise.all(
		entries
			.filter((entry) => entry.isDirectory())
			.map((entry) => walkDirectories(path.join(directory, entry.name)))
	);

	return [directory, ...nestedDirectories.flat()];
}

async function isFreshEnough(sourcePath, outputPath) {
	try {
		const [sourceStats, outputStats] = await Promise.all([stat(sourcePath), stat(outputPath)]);
		return outputStats.mtimeMs >= sourceStats.mtimeMs;
	} catch {
		return false;
	}
}

async function ensureWebpVariant(sourcePath, outputPath, width, quality) {
	if (sourcePath === outputPath || (await isFreshEnough(sourcePath, outputPath))) {
		return false;
	}

	await sharp(sourcePath)
		.rotate()
		.resize({ width, withoutEnlargement: true })
		.webp({ quality })
		.toFile(outputPath);

	return true;
}

async function main() {
	const directories = await walkDirectories(DATA_DIR);
	let generatedCount = 0;

	for (const directory of directories) {
		const entries = await readdir(directory, { withFileTypes: true });
		const sourceImage = entries.find(
			(entry) =>
				entry.isFile() && SOURCE_PATTERN.test(entry.name) && !entry.name.endsWith('-thumb.webp')
		);

		if (!sourceImage) {
			continue;
		}

		const extension = path.extname(sourceImage.name);
		const basename = sourceImage.name.slice(0, -extension.length);
		const sourcePath = path.join(directory, sourceImage.name);
		const webpPath = path.join(directory, `${basename}.webp`);
		const thumbPath = path.join(directory, `${basename}-thumb.webp`);

		if (await ensureWebpVariant(sourcePath, webpPath, FULL_SIZE_WIDTH, FULL_SIZE_QUALITY)) {
			generatedCount += 1;
		}

		if (await ensureWebpVariant(sourcePath, thumbPath, THUMB_WIDTH, THUMB_QUALITY)) {
			generatedCount += 1;
		}
	}

	console.log(`Generated ${generatedCount} optimized cuadro assets.`);
}

await main();
