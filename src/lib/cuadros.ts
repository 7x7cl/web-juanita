import { getCollection, type CollectionEntry } from 'astro:content';
import order from '../content/cuadros/order.json';

export type Cuadro = CollectionEntry<'cuadros'>;
export type CuadroDate = { day?: number; month?: number; year: number };

const MONTHS_ES = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre',
] as const;

export function formatCuadroDate(date?: CuadroDate) {
	if (!date?.year) return null;
	const monthName = date.month ? MONTHS_ES[date.month - 1] : undefined;
	if (date.day && monthName) return `${date.day} de ${monthName} del ${date.year}`;
	if (monthName) return `${monthName} del ${date.year}`;
	return String(date.year);
}

export async function getCuadros() {
	const orderIndex = new Map(order.map((id, index) => [id, index]));
	return (await getCollection('cuadros')).sort(
		(a, b) => (orderIndex.get(a.id) ?? Number.MAX_SAFE_INTEGER) - (orderIndex.get(b.id) ?? Number.MAX_SAFE_INTEGER),
	);
}
