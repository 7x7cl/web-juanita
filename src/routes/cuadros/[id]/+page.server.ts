import { getCuadroById, getCuadrosData } from '$lib/cuadros';
import type { PageServerLoad } from './$types';

import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = async () => {
    const cuadros = await getCuadrosData();
    const ids = cuadros.map((cuadro) => ({
        id: cuadro.id,
    }));
    return ids
};

export const load = (async ({ params }) => {
    return {
        cuadro: await getCuadroById(params.id)
    };
}) satisfies PageServerLoad;

export const prerender = true;