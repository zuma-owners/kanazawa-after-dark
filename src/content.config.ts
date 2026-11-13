import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 記事は src/content/articles/YYYY-MM-DD-slug.md に置く。
// URL は日付を除いた /articles/slug/ になる。
const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			subtitle: z.string(),
			description: z.string().min(80).max(170),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			area: z.string().optional(),
			tags: z.array(z.string()).default([]),
			heroImage: image().optional(),
			heroAlt: z.string().optional(),
			// Guide ページに載せる 2〜3 行の紹介文（なければ description を使う）
			guideSummary: z.string().optional(),
			// 関連記事を手動で指定したいときだけ使う（記事の slug）
			related: z.array(z.string()).optional(),
			// true の記事は本番ビルドに含めない（掲載許可待ちなど）
			draft: z.boolean().default(false),
			place: z
				.object({
					name: z.string(),
					nameJa: z.string().optional(),
					type: z.enum(['BarOrPub', 'Restaurant', 'NightClub', 'LocalBusiness']).default('BarOrPub'),
					address: z.string(),
					access: z.string().optional(),
					priceRange: z.string().optional(),
					payment: z.string().optional(),
					hours: z.string(),
					closed: z.string().optional(),
					website: z.string().url().optional(),
					// 住所・営業時間などを Web で確認できたら true
					verified: z.boolean(),
					checkedDate: z.coerce.date().optional(),
				})
				.optional(),
		}),
});

export const collections = { articles };
