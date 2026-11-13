export interface CuadroDate {
	day?: number;
	month?: number;
	year: number;
}

export interface Cuadro {
	slug: string;
	path: string;
	titulo: string;
	portada: string;
	vendido: boolean;
	start?: CuadroDate;
	end?: CuadroDate;
	measures: { width: number; height: number };
}

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

export function cuadroImagePath(slug: string) {
	return `/img/cuadros/${slug}.jpg`;
}

const orderIndex = new Map<string, number>(CUADROS_ORDER.map((id, index) => [id, index]));

type CuadroDoc = {
	stem: string;
	titulo: string;
	vendido: boolean;
	start?: CuadroDate;
	end?: CuadroDate;
	measures: { width: number; height: number };
};

export function toCuadro(doc: CuadroDoc): Cuadro {
	const slug = doc.stem.split('/').pop() ?? doc.stem;
	return {
		slug,
		path: `/cuadros/${slug}`,
		titulo: doc.titulo,
		portada: cuadroImagePath(slug),
		vendido: doc.vendido,
		start: doc.start,
		end: doc.end,
		measures: doc.measures,
	};
}

export function sortCuadros<T extends { slug: string }>(cuadros: T[]): T[] {
	return [...cuadros].sort(
		(a, b) =>
			(orderIndex.get(a.slug) ?? Number.MAX_SAFE_INTEGER) -
			(orderIndex.get(b.slug) ?? Number.MAX_SAFE_INTEGER),
	);
}
