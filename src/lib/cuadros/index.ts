type CuadrosData = {
    titulo: string;
    portada: string;
    id: string;
    vendido: boolean;
    start?: {
        month?: number;
        year: number;
    }
    end?: {
        month?: number;
        year: number;
    }
}

export const CUADROS: string[] = [
    "troles-de-valparaiso",
    "gallinas-y-patos",
    "olmue",
    "puente",
    "cabana-de-campo",
    "pileta",
    "granja",
    "la-casona-de-campo",
    "primavera",
    "la-cascada",
    "capilla-la-dormida",
    "un-hogar-de-ensueno",
    "recuerdos-del-sur",
    "la-matriz",
    "cerezo-en-flor",
    "mama-gallina-y-sus-pollitos",
    "camino-nostalgico",
    "descanso",
    "calas",
    "chiloe-y-sus-maravillas",
    "la-portada",
    "montanas-nevadas",
    "el-sendero",
];

export async function getCuadrosData() {
    const data: CuadrosData[] = [];
    for (const e of CUADROS) {
        const cuadro = await import(`$lib/cuadros/data/${e}/data.json`);
        data.push(cuadro);
    }
    return data;
}

export async function getCuadroById(id: string) {
    const data = await import(`$lib/cuadros/data/${id}/data.json`);
    return data;
}