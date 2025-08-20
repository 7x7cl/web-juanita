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
    "mirador-cerro-baron",
    "alturas-de-valparaiso",
    "gallinas-y-patos",
    "ascensor-villa-seca-valparaiso",
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
    "casas-del-cerro-alegre",
    "recuerdos-del-sur",
    "la-matriz",
    "cerro-alegre-vista-al-mar",
    "cerezo-en-flor",
    "mama-gallina-y-sus-pollitos",
    "camino-nostalgico",
    "descanso",
    "calas",
    "troles-de-valparaiso",
    "capilla-nino-dios-de-las-palmas-olmue",
    "chiloe-y-sus-maravillas",
    "la-portada",
    "montanas-nevadas",
    "la-casona-de-tejas",
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