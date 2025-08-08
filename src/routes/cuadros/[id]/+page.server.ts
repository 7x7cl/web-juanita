import { getCuadroById } from '$lib/cuadros';
import type { PageServerLoad } from './$types';

export const load = (async ({ params: { id } }) => {
    return {
        cuadro: await getCuadroById(id)
    };
}) satisfies PageServerLoad;