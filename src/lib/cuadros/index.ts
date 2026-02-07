export type CuadroDate = {
	day?: number;
	month?: number;
	year: number;
};

export type CuadroMeasures = {
	width: number;
	height: number;
};

export type CuadroData = {
	$schema?: string;
	titulo: string;
	portada: string;
	id: string;
	vendido: boolean;
	start?: CuadroDate;
	end?: CuadroDate;
	measures: CuadroMeasures;
};

export const CUADROS = [
	'mirador-cerro-baron',
	'alturas-de-valparaiso',
	'gallinas-y-patos',
	'ascensor-villa-seca-valparaiso',
	'olmue',
	'puente',
	'cabana-de-campo',
	'pileta',
	'granja',
	'la-casona-de-campo',
	'primavera',
	'la-cascada',
	'capilla-la-dormida',
	'un-hogar-de-ensueno',
	'casas-del-cerro-alegre',
	'recuerdos-del-sur',
	'la-matriz',
	'cerro-alegre-vista-al-mar',
	'cerezo-en-flor',
	'mama-gallina-y-sus-pollitos',
	'camino-nostalgico',
	'descanso',
	'calas',
	'troles-de-valparaiso',
	'capilla-nino-dios-de-las-palmas-olmue',
	'chiloe-y-sus-maravillas',
	'la-portada',
	'montanas-nevadas',
	'la-casona-de-tejas',
	'el-sendero'
];

const dataModules = import.meta.glob('./data/*/data.json', { eager: true }) as Record<
	string,
	{ default: CuadroData }
>;

export async function getCuadrosData() {
	return CUADROS.map((id) => dataModules[`./data/${id}/data.json`]?.default).filter(
		Boolean as unknown as (value: CuadroData | undefined) => value is CuadroData
	);
}

export async function getCuadroById(id: string) {
	return dataModules[`./data/${id}/data.json`]?.default ?? null;
}
