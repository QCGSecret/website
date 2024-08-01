import { defineCollection, reference, z } from 'astro:content'

const guideCollection = defineCollection({
	type: 'content',
	schema: z.object({
		id: z.string(),
		map: z.string(),
		authors: z.array(reference('author')),
		wip: z.boolean().default(false),
	}),
})

const authorCollection = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		avatar: z.string(),
	}),
})

export const collections = {
	guide: guideCollection,
	author: authorCollection,
}
