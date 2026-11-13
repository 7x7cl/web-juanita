import { defineCollection, defineContentConfig, z } from '@nuxt/content';

const cuadroDate = z.object({
	day: z.number().optional(),
	month: z.number().optional(),
	year: z.number(),
});

export default defineContentConfig({
	collections: {
		cuadros: defineCollection({
			type: 'page',
			source: 'cuadros/**/*.md',
			schema: z.object({
				titulo: z.string(),
				vendido: z.boolean(),
				start: cuadroDate.optional(),
				end: cuadroDate.optional(),
				measures: z.object({
					width: z.number(),
					height: z.number(),
				}),
			}),
		}),
	},
});
