import { getCuadrosData } from '$lib/cuadros';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {
        cuadros: await getCuadrosData()
    };
}) satisfies PageServerLoad;