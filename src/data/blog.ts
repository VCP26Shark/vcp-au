import { getCollection, type CollectionEntry } from 'astro:content';

/* Blog helpers shared by /blog and /blog/<slug>. Post content lives in src/content/blog. */

export type Post = CollectionEntry<'blog'>;

/** Published posts, newest first */
export const getPosts = async () =>
	(await getCollection('blog', ({ data }) => !data.draft)).sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
	);

/** Whole minutes at roughly 220 words a minute, never less than one */
export const readingTime = (post: Post) => {
	const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
	return `${Math.max(1, Math.round(words / 220))} min read`;
};

export const formatDate = (date: Date) =>
	date.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
