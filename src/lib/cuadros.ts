import { getCollection, type CollectionEntry } from 'astro:content';
import order from '../content/cuadros/order.json';

export type Cuadro = CollectionEntry<'cuadros'>;

export async function getCuadros() {
	const orderIndex = new Map(order.map((id, index) => [id, index]));
	return (await getCollection('cuadros')).sort(
		(a, b) => (orderIndex.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (orderIndex.get(b.id) ?? Number.MAX_SAFE_INTEGER),
	);
}
