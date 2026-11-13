import { type CollectionEntry, getCollection } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

/** ファイル名 2026-11-20-some-bar → URL 用 slug some-bar */
export const slugOf = (a: Article) => a.id.replace(/^\d{4}-\d{2}-\d{2}-/, '');
export const urlOf = (a: Article) => `/articles/${slugOf(a)}/`;

/** 公開記事を新しい順に。draft は開発中（npm run dev）だけ表示する */
export async function getArticles(): Promise<Article[]> {
	const all = await getCollection('articles', (a) => (import.meta.env.PROD ? !a.data.draft : true));
	return all.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** 関連記事：手動指定 → 同じエリア → タグの重なり → 新しい順 */
export function relatedArticles(current: Article, all: Article[], count = 2): Article[] {
	const others = all.filter((a) => a.id !== current.id);
	const manual = (current.data.related ?? [])
		.map((s) => others.find((a) => slugOf(a) === s))
		.filter((a): a is Article => Boolean(a));
	const score = (a: Article) =>
		(current.data.area && a.data.area === current.data.area ? 10 : 0) +
		a.data.tags.filter((t) => current.data.tags.includes(t)).length;
	const auto = others
		.filter((a) => !manual.includes(a))
		.sort((a, b) => score(b) - score(a) || b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	return [...manual, ...auto].slice(0, count);
}
