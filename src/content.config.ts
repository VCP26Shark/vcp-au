import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/* Blog posts: one Markdown file per post in src/content/blog. The file name is the URL slug
   (/blog/<file-name>). Covers are local images, so Astro optimises them at build time. */

const blog = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			/** One or two sentences, used for the listing, the post lead and the meta description */
			description: z.string(),
			category: z.string(),
			date: z.coerce.date(),
			author: z.string().default('VCPility Team'),
			cover: image(),
			coverAlt: z.string(),
			/** Hide a post from the site without deleting it */
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
