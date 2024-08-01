import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import critters from 'astro-critters';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	integrations: [react(), mdx(), compress(), critters(), tailwind({ applyBaseStyles: false })],
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
});
