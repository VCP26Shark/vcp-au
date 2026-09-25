// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Plus Jakarta Sans',
			cssVariable: '--font-sans',
			weights: ['200 800'],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['system-ui', 'sans-serif'],
		},
	],
});
