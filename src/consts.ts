// サイト全体の設定。SNSやドメインが決まったらここを書き換えるだけで全ページに反映される。

export const SITE_URL = 'https://kanazawa-after-dark.pages.dev';
export const SITE_TITLE = 'Kanazawa After Dark';
export const SITE_TAGLINE = 'English-friendly bars, izakaya and late nights in Kanazawa, from a local who actually goes.';
export const SITE_DESCRIPTION =
	'Kanazawa nightlife for travelers: English-friendly bars and izakaya I have personally visited, with honest notes on menus, prices and how to order.';
export const AUTHOR = 'ZUMA';
export const CONTACT_EMAIL = 'info.zuma.owners@gmail.com';

// SNS が決まったら url を入れる（例: 'https://www.instagram.com/xxxx/'）。null のあいだはフォロー導線は SNS リンクなしで表示される。
export const SOCIAL: { label: string; url: string | null } = {
	label: 'Instagram',
	url: null,
};

// Guide ページの「最終更新日」。毎月最初の実行時に更新する。
export const GUIDE_UPDATED = '2026-11-13';

export type Area = { slug: string; name: string; ja: string; blurb: string };

// エリア一覧。記事の frontmatter の area にはこの slug を書く。
export const AREAS: Area[] = [
	{ slug: 'katamachi', name: 'Katamachi', ja: '片町', blurb: 'The busiest nightlife district in Kanazawa.' },
	{ slug: 'kiguramachi', name: 'Kiguramachi', ja: '木倉町', blurb: 'A narrow street of small restaurants and bars next to Katamachi.' },
	{ slug: 'korinbo', name: 'Korinbo', ja: '香林坊', blurb: 'Downtown Kanazawa, a short walk from Katamachi.' },
	{ slug: 'kanazawa-station', name: 'Kanazawa Station', ja: '金沢駅周辺', blurb: 'Handy if you are arriving late or leaving early.' },
	{ slug: 'other', name: 'Other areas', ja: 'その他', blurb: 'Good nights outside the main districts.' },
];

export const areaBySlug = (slug?: string) => AREAS.find((a) => a.slug === slug);
