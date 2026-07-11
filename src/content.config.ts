import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const cuadroDate = z.object({
	day: z.number().optional(),
	month: z.number().optional(),
	year: z.number(),
});

const cuadros = defineCollection({
	loader: glob({
		pattern: '**/index.md',
		base: './src/content/cuadros',
		generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
	}),
	schema: ({ image }) =>
		z.object({
			titulo: z.string(),
			portada: image(),
			vendido: z.boolean(),
			start: cuadroDate.optional(),
			end: cuadroDate.optional(),
			measures: z.object({
				width: z.number(),
				height: z.number(),
			}),
		}),
});

export const collections = { cuadros };
