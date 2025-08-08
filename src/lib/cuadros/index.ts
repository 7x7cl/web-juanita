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
    "puente",
    "pileta",
    "la-casona-de-campo",
    "primavera",
    "la-cascada",
    "cerezo-en-flor",
    "camino-nostalgico",
    "descanso",
    "calas",
    "la-portada",
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