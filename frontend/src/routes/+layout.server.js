import { getInfo, getSeo, getPolicies } from '$lib/utils/sanity';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const info = await getInfo();
	const seo = await getSeo();
	const policies = await getPolicies();
	const { pathname } = url
	const searchTopics = url.searchParams.getAll('topic');
	const searchString = url.searchParams.get('search');
	if (info, seo, policies, pathname) {
		return {
			info,
			seo,
			policies,
			pathname,
			searchTopics,
			searchString,
		};
	}
	throw error(404, 'Not found');
}