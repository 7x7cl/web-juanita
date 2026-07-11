import { getCollection, type CollectionEntry } from 'astro:content';

export type Cuadro = CollectionEntry<'cuadros'>;

export async function getCuadros() {
	return (await getCollection('cuadros')).sort((a, b) => b.data.order - a.data.order);
}
