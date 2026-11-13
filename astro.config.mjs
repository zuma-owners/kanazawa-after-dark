// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// 独自ドメインが決まったら、ここと src/consts.ts の SITE_URL を書き換える
const SITE_URL = 'https://kanazawa-after-dark.pages.dev';

export default defineConfig({
	site: SITE_URL,
	trailingSlash: 'always',
	integrations: [sitemap()],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['system-ui', 'sans-serif'],
			options: {
				variants: [
					{ src: ['./src/assets/fonts/atkinson-regular.woff'], weight: 400, style: 'normal', display: 'swap' },
					{ src: ['./src/assets/fonts/atkinson-bold.woff'], weight: 700, style: 'normal', display: 'swap' },
				],
			},
		},
	],
});
